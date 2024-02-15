const repo = require("../repository/ScheduleConfig");
const cron = require("node-cron");
const Cloner = require("../../cloner/service/Cloner");
let cronTask = null;
class SchedulelarService {
  constructor() {}

  async restartCron() {
    const configs = await repo.findAll();
    if (configs.length > 0) {
      const config = configs[0];
      if (cronTask) {
        cronTask.stop();
      }
      const hour = config.time.split(":")[0];
      const minute = config.time.split(":")[1];
      cronTask = cron.schedule(
        "0 " + minute + " " + hour + " * * *",
        () => {
          Cloner.saveWithSchedule();
        },
        {
          scheduled: true,
          timezone: "Europe/Istanbul",
        }
      );
    }
  }
}

module.exports = new SchedulelarService();
