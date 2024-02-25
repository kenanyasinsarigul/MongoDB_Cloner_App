<template>
  <div class="body" style="min-height: 680px;">
    <b-card style="margin-bottom: 1.5rem">
      <b-form>
        <b-row id="input-group-1" style="margin-bottom: 1rem">
          <b-col md="3">
            <b-label
              class="form-control bg-light"
              style="color: black; text-align: center; font-weight: bold;"
            >
              Select The Schedule Time</b-label
            >
          </b-col>
          <b-col md="3">
            <b-label
              class="form-control bg-light"
              style="color: black; text-align: center; font-weight: bold;"
            >
              Select Sources</b-label
            >
          </b-col>
          <b-col md="3">
            <b-label
              class="form-control bg-light"
              style="color: black; text-align: center; font-weight: bold;"
            >
              Select The Target</b-label
            >
          </b-col>
          <b-col md="3">
            <b-label
              class="form-control bg-light"
              style="color: black; text-align: center; font-weight: bold;"
            >
              Select Actions</b-label
            >
          </b-col>
        </b-row>
        <b-row id="input-group-2">
          <b-col md="3">
            <b-card style="min-height: 275px">
              <b-time class="rounded" v-model="selectedTime" locale="en"></b-time>
              <hr />
              <b-button
                variant="outline-success"
                size="xs"
                style="margin-right: 1rem; width: 45%; float: left"
                @click="setNowTime()"
                >Set Now</b-button
              >
              <b-button
                variant="outline-danger"
                size="xs"
                style="width: 45%; float: left"
                @click="resetTime()"
                >Reset</b-button
              >
            </b-card>
          </b-col>
          <b-col md="3">
            <b-card style="min-height: 275px">
              <b-form-group>
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="selectedList"
                  :options="environmentsOptions"
                  class="materialCheckboxSource"
                  size="md"
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </b-col>
          <b-col md="3">
            <b-card style="min-height: 275px">
              <b-form-group>
                <b-form-radio-group
                  id="radio-group-2"
                  v-model="selected"
                  :options="environmentsOptions"
                  class="materialCheckboxTarget"
                  size="md"
                ></b-form-radio-group>
              </b-form-group>
            </b-card>
          </b-col>
          <b-col md="3">
            <b-card style="min-height: 275px">
              <b-button
                variant="primary"
                style="margin-right: 1rem; width: 100%"
                @click="$bvModal.show('save-modal')"
                >Save Schedule</b-button
              >
              <br />
              <b-button
                variant="success"
                style="margin-top: 1rem; width: 100%"
                @click="$bvModal.show('backup-modal')"
                >Backup Now</b-button
              >
              <br>
              <div
                class="spinner-border text-success"
                style="margin-top: 1rem"
                role="status"
                v-if="!condition"
              ></div>
              <div
                class="spinner-grow text-success"
                style="margin-top: 1rem; margin-left: 0.2rem"
                role="status"
                v-if="!condition"
              ></div>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-modal
      id="save-modal"
      size="sm"
      button-size="sm"
      centered
      hide-header-close
    >
      <template #modal-header> </template>
      <template #default> Do you really want to save the schedule? </template>
      <template #modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click="save(), ok()">
          Okay
        </b-button>
        <b-button size="sm" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
    <b-modal
      id="backup-modal"
      size="sm"
      button-size="sm"
      centered
      hide-header-close
    >
      <template #modal-header> </template>
      <template #default> Do you really want to start the backup process? </template>
      <template #modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click="onDemandClone(), ok()">
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

const schema = {
  connection: undefined,
  name: undefined,
  dbName: undefined,
  description: undefined,
};

const payload = {
  sources: undefined,
  target: undefined,
  time: undefined,
};

export default {

  data() {
    return {
      environments: [],
      selectedList: [],
      environmentsOptions: [],
      entity: { ...schema },
      selected: { ...schema },
      selectedTime: "",
      payload: { ...payload },
      res: undefined,
      condition: true,
    };
  },

  async mounted() {
    this.$vToastify.setSettings({
      position: "top-right",
      theme: "light",
      canTimeout: false,
    });

    const { data } = await this.getEnvironments();
    const scheduleConfigData = await this.list();
    this.environments = data;

    if (scheduleConfigData.length <= 0) {
      this.selectedList = [];
      this.selected = {};
      this.selectedTime = "";
    }

    this.selectedList = scheduleConfigData.data[0]?.sources.filter(
      (i) => !!this.environments.find((e) => e._id == i._id)
    );
    this.selected = scheduleConfigData.data[0]?.target;
    this.selectedTime = scheduleConfigData.data[0]?.time;

    for (const item of this.environments) {
      const data = { text: "", value: {} };
      data.text = item.name;
      data.value = item;
      this.environmentsOptions.push(data);
    }
  },
  methods: {
    ...mapActions({
      list: "ScheduleConfig/list",
      create: "ScheduleConfig/create",
      update: "ScheduleConfig/update",
      delete: "ScheduleConfig/delete",
      getEnvironments: "Environment/list",
      clone: "ScheduleConfig/clone",
    }),
    async save() {
      this.payload.sources = this.selectedList.map((i) => i._id);
      this.payload.target = this.selected._id;
      this.payload.time = this.selectedTime;
      await this.create(this.payload);
      this.$vToastify.success("Schedule configuration saved!");
    },
    async onDemandClone() {
      this.condition = false;
      this.payload.sources = this.selectedList;
      this.payload.target = this.selected;
      this.payload.time = new Date();
      this.res = await this.clone(this.payload);
      if (this.res) {
        this.condition = true;
      }
      this.$vToastify.success("Clonned Successfully!");
    },
    setNowTime(){
      this.selectedTime = new Date().getHours()+":"+new Date().getMinutes()
    },
    resetTime(){
      this.selectedTime = '';
    }
  },
};
</script>

<style scoped>
.materialCheckboxSource {
  label {
    margin-left: 1rem;
    color: black;
    font-size: large;
  }
  input:hover {
    cursor: pointer;
  }
}
.materialCheckboxTarget {
  label {
    margin-left: 1rem;
    color: black;
    font-size: large;
  }
  input:hover {
    cursor: pointer;
  }
}
</style>
