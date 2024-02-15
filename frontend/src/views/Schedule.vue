<template>
  <div>
    <MenuNavBar />
    <div class="container">
      <!-- Card -->
      <div class="card mt-3 shadow-lg p-3 bg-white rounded">
        <div class="card-header border-bottom">
          <h4 class="card-header-title">SCHEDULE</h4>
        </div>

        <!-- Body -->
        <div class="card-body">
          <div>
            <!-- Form -->

            <div class="row mb-4">
              <div class="col-md-2">
                <b-form-timepicker
                  id="timepicker-buttons"
                  now-button
                  reset-button
                  size="sm"
                  locale="en"
                  dropright
                  placeholder=""
                  no-close-button
                  v-model="selectedTime"
                ></b-form-timepicker>
                <br />
                <a class="btn btn-primary" style="width: 100%" @click="save()">
                  Save
                </a>
                <a
                  class="btn btn-danger"
                  style="width: 100%; margin-top: 1rem"
                  @click="onDemandClone()"
                  v-if="condition"
                >
                  Clone Now
                </a>
                <div
                  class="spinner-border text-danger"
                  style="margin-top: 1rem"
                  role="status"
                  v-if="!condition"
                ></div>
                <div
                  class="spinner-grow text-danger"
                  style="margin-top: 1rem; margin-left:0.2rem;"
                  role="status"
                  v-if="!condition"
                ></div>
              </div>
              <div class="col-md-4">
                <div class="row">
                  <div class="col-sm-1"></div>
                  <div class="col-sm-4">
                    <label><strong>Source : </strong></label>
                  </div>
                  <div class="col-sm-7">
                    <b-form-group v-slot="{ ariaDescribedby }">
                      <b-form-checkbox-group
                        id="checkbox-group-1"
                        v-model="selectedList"
                        :options="environmentsOptions"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-1"
                      ></b-form-checkbox-group>
                    </b-form-group>
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <label><strong>---></strong></label>
              </div>
              <div class="col-md-4">
                <div class="row">
                  <div class="col-sm-1"></div>
                  <div class="col-sm-4">
                    <label><strong>Target : </strong></label>
                  </div>
                  <div class="col-sm-7">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="selected"
                      :options="environmentsOptions"
                      name="radio-options"
                    ></b-form-radio-group>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Form -->
          </div>
        </div>
        <!-- End Body -->
      </div>
      <!-- End Card -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ConfirmModal from "../components/ConfirmModal.vue";
import MenuNavBar from "../components/menu-navbar.vue";

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
  components: {
    ConfirmModal,
    MenuNavBar,
  },

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

    const disableButton = true;

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
  },
};
</script>

<style scoped></style>
