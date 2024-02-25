<template>
  <div>
    <b-card style="margin-bottom: 1.5rem">
      <b-form>
        <b-row id="input-group-1" style="margin-bottom: 2rem; margin-top: 2rem">
          <b-col md="1"></b-col>
          <b-col md="1" style="text-align: left; padding-top: 0.5rem">
            <b-label style="color: black; text-decoration: underline;"> Source : </b-label>
          </b-col>
          <b-col md="9">
            <div class="input-group">
              <select
                v-model="selectedSource"
                @change="changeSource"
                class="form-control"
              >
                <option
                  v-for="environment in environments"
                  :value="environment"
                  :key="environment._id"
                >
                  {{ environment.name }}
                </option>
              </select>

              <input
                v-model="form.source.connection"
                type="text"
                class="form-control"
                name="firstName"
                id="firstNameLabel"
                placeholder="Source connection"
              />
              <input
                v-model="form.source.dbName"
                type="text"
                class="form-control"
                name="lastName"
                id="lastNameLabel"
                placeholder="Database name"
              />
            </div>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
        <b-row id="input-group-2" style="margin-bottom: 2rem; margin-top: 2rem">
          <b-col md="1"></b-col>
          <b-col md="1" style="text-align: left; padding-top: 0.5rem">
            <b-label style="color: black; text-decoration: underline;"> Target : </b-label>
          </b-col>
          <b-col md="9">
            <div class="input-group">
              <select
                v-model="selectedTarget"
                @change="changeTarget"
                class="form-control"
              >
                <option
                  v-for="environment in environments"
                  :value="environment"
                  :key="environment._id"
                >
                  {{ environment.name }}
                </option>
              </select>

              <input
                v-model="form.target.connection"
                type="text"
                class="form-control"
                name="firstName"
                id="firstNameLabel"
                placeholder="Source connection"
              />
              <input
                v-model="form.target.dbName"
                type="text"
                class="form-control"
                name="lastName"
                id="lastNameLabel"
                placeholder="Database name"
              />
            </div>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
        <b-row id="input-group-3" style="margin-bottom: 2rem">
          <b-col md="2"></b-col>
          <b-col md="9">
            <input
              class="form-check-input"
              type="checkbox"
              id="checkbox"
              v-model="form.target.reCreate"
            />
            <label
              class="form-check-label"
              style="padding-left: 0.5rem"
              for="checkbox"
            >
              Recreate if database exists in target environment
            </label>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
        <b-row id="input-group-3" style="margin-bottom: 2rem">
          <b-col md="1"></b-col>
          <b-col md="1" style="text-align: left; padding-top: 0.5rem">
            <b-label style="color: black"> Ignore : </b-label>
          </b-col>
          <b-col md="9">
            <div class="input-group">
              <input
                v-model="ignore"
                type="text"
                id="exampleFormControlInput2"
                class="form-control"
                placeholder="Press enter to add"
                @keyup.enter="addIgnoreList"
              />
            </div>
            <div class="input-group">
              <span
                v-for="(item, index) in form.ignoreList"
                :title="item"
                :key="item"
                class="text-truncate badge bg-soft-secondary text-secondary mt-5"
                style="margin-right: 10px; cursor: pointer"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-describedby
              >
                <i
                  @click="removeIgnore(index)"
                  style="color: red"
                  class="bi bi-x"
                ></i>
                {{ item | summer(30) }}
              </span>
            </div>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
        <b-row id="input-group-1" style="margin-bottom: 2rem">
          <b-col md="2"></b-col>
          <b-col md="9">
            <b-button
              variant="primary"
              style="margin-right: 1rem"
              v-if="condition"
              @click="check()"
              >Start</b-button
            >
            <b-button variant="danger" @click="clearAll()">Reset</b-button>
            <div style="margin-top: 0.5rem; float: right">
              <div
                class="spinner-border text-primary"
                role="status"
                v-if="!condition"
              ></div>
              <div
                class="spinner-grow text-primary"
                style="margin-left: 0.2rem"
                role="status"
                v-if="!condition"
              ></div>
            </div>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card style="margin-bottom: 1.5rem">
      <b-row class="row">
        <b-col md="1"></b-col>
        <b-col md="5">
          <b-label style="color: black">SUCCESS LİST</b-label>
          <i
            class="bi bi-check-circle-fill"
            style="color: green; margin-left: 1rem"
          >
            <span v-if="job && job.status == 'done'">
              <label
                v-if="!job.anyError"
                class="text-success"
                style="margin-left: 1rem"
                >process succeded!</label
              >
            </span>
          </i>
          <hr />
          <div
            class="form-group"
            id="info"
            style="max-height: 250px; overflow-y: scroll"
          >
            <div v-for="item in jobItem" :key="item.id">
              <div data-spy="scroll" v-if="item.type == 'info'">
                <div>
                  {{ item.message }}
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="5">
          <b-label style="color: black">ERROR LİST</b-label>
          <i class="bi bi-x-circle-fill" style="color: red; margin-left: 1rem">
            <span v-if="job && job.status == 'done'">
              <label
                v-if="job.anyError"
                class="text-danger"
                style="margin-left: 1rem"
                >process failed!</label
              >
            </span>
          </i>
          <hr />
          <div
            class="form-group"
            id="error"
            style="max-height: 250px; overflow-y: scroll"
          >
            <div v-for="item in jobItem" :key="item.id">
              <div data-spy="scroll" v-if="item.type == 'error'">
                <div>
                  <strong> {{ item.message }}</strong>
                </div>
                <div>
                  {{ item.error }}
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="1"></b-col>
      </b-row>
    </b-card>
    <b-modal
      id="start-modal"
      size="sm"
      button-size="sm"
      centered
      hide-header-close
    >
      <template #modal-header> </template>
      <template #default> Do you really want to start the cloner? </template>
      <template #modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click="cloner(), ok()">
          Okay
        </b-button>
        <b-button size="sm" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  components: {},

  data() {
    return {
      collections: [],
      completedStatus: false,
      ignore: null,
      job: null,
      ignore: null,
      jobItem: [],
      environments: [],
      selectedSource: null,
      selectedTarget: null,
      condition: true,
      form: {
        source: { connection: "mongodb://127.0.0.1:27017", dbName: null },
        target: {
          connection: "mongodb://127.0.0.1:27017",
          dbName: null,
          reCreate: false,
        },
        ignoreList: ["log"],
      },
    };
  },
  async mounted() {
    this.$vToastify.setSettings({
      position: "top-right",
      theme: "light",
      canTimeout: false,
    });
    const { data } = await this.getEnvironments();
    this.environments = data;
  },
  watch: {
    jobItem() {
      setTimeout(() => this.scrollToBottom(), 100);
    },
  },
  methods: {
    ...mapActions({
      clone: "Clone/clone",
      get: "Clone/get",
      getEnvironments: "Environment/list",

      getjobItem: "Clone/getJob",
    }),

    changeTarget() {
      this.form.target = { ...this.selectedTarget };
    },
    changeSource() {
      this.form.source = { ...this.selectedSource };
    },
    async cloner() {
      this.condition = false;
      this.clearJob();
      const { data } = await this.clone(this.form);
      this.job = data.job;
      this.getData();
      this.getDataItem();
      if (data) {
        this.condition = true;
      }
    },
    clearJob() {
      this.job = null;
      this.jobItem = [];
    },
    clearAll() {
      this.selectedSource = null;
      this.selectedTarget = null;
      this.form.source.connection = null;
      this.form.source.dbName = null;
      this.form.target.connection = null;
      this.form.target.dbName = null;
      this.form.target.reCreate = false;
      this.form.ignoreList = [];
      this.form.ignore = null;
      this.job = null;
      this.jobItem = [];
    },
    clearCheckbox() {
      this.form.target.reCreate = false;
    },
    addIgnoreList() {
      if (!this.form.ignoreList.includes(this.ignore)) {
        this.form.ignoreList.push(this.ignore);
      }
      this.ignore = null;
    },
    async removeIgnore(index) {
      this.form.ignoreList.splice(index, 1);
    },
    getData() {
      setTimeout(async () => {
        if (this.job) {
          const { data } = await this.get(this.job.id);
          this.job = data;
          if (this.job.status == "done") {
            if (this.job.anyError) {
              this.$vToastify.warning(
                "An error occurred during copying!",
                "Warning!"
              );
            } else {
              this.$vToastify.success(
                "The copying process is completed.",
                "Success!"
              );
            }
            this.clearCheckbox();
          }
        }

        if (this.job.status == "running") {
          this.getData();
        }
      }, 1000);
    },
    getDataItem() {
      setTimeout(async () => {
        if (this.job) {
          const { data } = await this.getjobItem(this.job._id);
          this.jobItem = data;
          if (this.job.status == "running") {
            this.getDataItem();
          }
        }
      }, 1000);
    },
    scrollToBottom() {
      var error = this.$el.querySelector("#error");
      var info = this.$el.querySelector("#info");

      window.scrollTo(0, document.body.scrollHeight);
      info.scrollTop = info.scrollHeight;
      error.scrollTop = error.scrollHeight;
    },
    check() {
      if (
        this.form.source.connection === null ||
        this.form.source.dbName === null ||
        this.form.target.connection === null ||
        this.form.target.dbName === null
      ) {
        this.$vToastify.warning("Please fill required inputs!", "Warning!");
      }else{
        this.$bvModal.show('start-modal')
      }
    },
  },
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
