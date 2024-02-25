const JobService = require("../../job/service/Job");
const JobItemService = require("../../job-item/service/JobItem");
const ScheduleConfigService = require("../../scheduleConfig/service/ScheduleConfig");
const MongoClient = require("mongodb").MongoClient;
const { PAGINATION_LIMIT } = require("../../../config/index");
const nodemailer = require("nodemailer");

//
const mongoose = require("mongoose");
const { response } = require("express");
const ObjectId = mongoose.Types.ObjectId;
//

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

function createBackupName(environment) {
  const date = new Date();
  date.addHours(3);
  return environment.toLowerCase().split("ı").join("i").split(" ").join("") + "_" + date.getDate() + "_" + (date.getMonth() + 1) + "_" + date.getHours() + "_" + date.getMinutes();
}

class ClonerService {
  get(jobId) {
    return JobService.findById(jobId);
  }

  async saveWithSchedule() {
    const entity = await ScheduleConfigService.findAll();
    const payload = entity[0];

    const response = await Promise.all(
      payload.sources.map(async (source) => {
        const cloneJob = {
          source,
          target: { ...payload.target, dbName: createBackupName(source.name) },
        };

        try {
          const job = await this.save(cloneJob);
          return {
            ...cloneJob,
            ...job,
          };
        } catch (error) {
          console.error(error);
          return {
            ...cloneJob,
            job: { end: new Date(), status: "fail", anyError: true },
          };
        }
      })
    );

    this.sendMail(response);
  }

  async sendMail(response) {
    try {
      const content = response
        .map((job) => {
          return `
        <span style='color:${job.job.anyError ? "red" : "green"}'>hasAnyError: ${job.job.anyError}</span><br>
        status: ${job.job.status}<br>
        at: ${job.job.end}<br>
        <br><br>
        source name:${job.source.name}<br>
        source connection: ${job.source.connection}<br>
        source dbName:${job.source.dbName}<br>
        <br><br>
        target name:${job.target.name}<br>
        target connection: ${job.target.connection}<br>
        target dbName:${job.target.dbName}<br>
      
      `;
        })
        .join("<hr>");

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_ACCOUNT,
          pass: process.env.EMAIL_PWD,
        },
      });
      console.log("mail gönderiliyor..");
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: (response.some((i) => i.job.anyError) ? "⛔️" : "✅") + " Tunesoft Regtech Backup Tool",
        html: content,
      });
      console.log("mail sended!");
    } catch (error) {
      console.error(error);
    }
  }

  async save(cloner) {
    const job = await JobService.create({
      sourceEnvironment: ObjectId("62459d83bf59719b8be91786"),
      targetEnvironment: ObjectId("62459d77bf59719b8be91785"),
    });

    async function main({ source, target, ignoreList = [] }) {
      const sourceConnection = await MongoClient.connect(source.connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const targetConnection = await MongoClient.connect(target.connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const sourceDB = sourceConnection.db(source.dbName);
      const targetDB = targetConnection.db(target.dbName);

      if (target.reCreate) {
        targetDB.dropDatabase();
      }

      const sourceCollections = await sourceDB.listCollections().toArray();
      const filteredCollections = sourceCollections.filter((sc) => {
        if (!ignoreList || ignoreList.length == 0) {
          return true;
        }

        for (const il of ignoreList) {
          if (il.startsWith("*")) {
            const searchForEndsWith = il.substr(1);
            if (sc.name.endsWith(searchForEndsWith)) {
              return false;
            }
          }

          if (il.endsWith("*")) {
            const searchForStartsWith = il.substr(0, il.indexOf("*"));
            if (sc.name.startsWith(searchForStartsWith)) {
              return false;
            }
          }

          if (il == sc.name) {
            return false;
          }
        }

        return true;
      });

      console.log("===============Start of List=======================");
      console.log(
        "Kopyalanacak Collection Listesi",
        filteredCollections.map((a) => a.name)
      );
      console.log("=================End of List=========================");

      let anyError = false;

      await Promise.all(
        filteredCollections.map(async (c) => {
          let totalCollectionData = 0;
          let page = 0;
          const targetCollection = targetDB.collection(c.name);

          await JobItemService.create({
            collectionName: c.name,
            message: c.name + " copying...",
            type: "info",
            job,
          });
          do {
            const data = await sourceDB
              .collection(c.name)
              .find({})
              .skip(PAGINATION_LIMIT * page)
              .limit(PAGINATION_LIMIT)
              .toArray();

            if (data && data.length > 0) {
              try {
                await targetCollection.insertMany(data);
                totalCollectionData += data.length;
              } catch (error) {
                console.log(error);
                anyError = true;
                await JobItemService.create({
                  collectionName: c.name,
                  message: c.name + " ERROR",
                  error: error.message,
                  type: "error",
                  job,
                });
              }
            } else {
              break;
            }
            page++;
          } while (true);

          await JobItemService.create({
            collectionName: c.name,
            message: c.name + " (" + totalCollectionData + ")" + " copied!",
            type: "info",
            job,
          });
        })
      );

      job.end = new Date();
      job.status = "done";
      job.anyError = anyError;

      await JobService.update(job);
    }

    await main({
      source: {
        connection: cloner.source.connection,
        dbName: cloner.source.dbName,
      },
      target: {
        connection: cloner.target.connection,
        dbName: cloner.target.dbName,
        reCreate: cloner.target.reCreate,
      },
      ignoreList: cloner.ignoreList,
    });
    return { job };
  }
}

module.exports = new ClonerService();
