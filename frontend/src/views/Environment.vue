<template>
  <div>
    <b-card style="margin-bottom: 1.5rem">
      <b-form>
        <b-row id="input-group-1" style="margin-bottom: 2rem; margin-top: 2rem">
          <b-col md="1"></b-col>
          <b-col md="2" style="text-align: left; padding-top: 0.5rem">
            <b-label style="color: black; text-decoration: underline;"> Environment Name : </b-label>
          </b-col>
          <b-col md="8">
            <b-form-group>
              <b-form-input
                id="input-1"
                v-model="entity.name"
                placeholder="New Environment"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
        <b-row id="input-group-1" style="margin-bottom: 2rem">
          <b-col md="1"></b-col>
          <b-col md="2" style="text-align: left; padding-top: 0.5rem">
            <b-label style="color: black; text-decoration: underline;"> Connection String : </b-label>
          </b-col>
          <b-col md="8">
            <b-form-group>
              <b-form-input
                id="input-1"
                v-model="entity.connection"
                placeholder="example://localhost:8080"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
        <b-row id="input-group-1" style="margin-bottom: 2rem">
          <b-col md="1"></b-col>
          <b-col md="2" style="text-align: left; padding-top: 0.5rem">
            <b-label style="color: black; text-decoration: underline;"> Database Name : </b-label>
          </b-col>
          <b-col md="8">
            <b-form-group>
              <b-form-input
                id="input-1"
                v-model="entity.dbName"
                placeholder="New Database"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
        <b-row id="input-group-1" style="margin-bottom: 2rem">
          <b-col md="1"></b-col>
          <b-col md="2" style="text-align: left; padding-top: 0.5rem">
            <b-label style="color: black"> Description : </b-label>
          </b-col>
          <b-col md="8">
            <b-form-group>
              <b-form-textarea
                id="input-4"
                v-model="entity.description"
                size="lg"
                placeholder="This is a new environment..."
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
        <b-row id="input-group-1" style="margin-bottom: 2rem">
          <b-col md="1"></b-col>
          <b-col md="2"></b-col>
          <b-col md="8">
            <b-button
              variant="primary"
              style="margin-right: 1rem"
              @click="check()"
              >Save</b-button
            >
            <b-button variant="danger" @click="resetForm()">Reset</b-button>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
      </b-form>
    </b-card>

    <div v-for="environment in environments" :key="environment._id">
      <b-card style="margin-bottom: 1.5rem">
        <b-row class="row">
          <b-col md="1"></b-col>
          <b-col md="2" style="padding-top: 2rem">
            <b-button
              variant="outline-danger"
              size="sm"
              @click="
                $bvModal.show('delete-modal'), setDeletedEntity(environment)
              "
              style="margin-right: 1rem; width: 50%; margin-bottom: 1rem"
              >Delete</b-button
            >
            <b-button
              variant="outline-success"
              size="sm"
              @click="
                $bvModal.show('edit-modal'), setSelectedEntity(environment)
              "
              style="margin-right: 1rem; width: 50%"
              >Edit</b-button
            >
          </b-col>
          <b-col md="8">
            <Label
              ><span style="color: darkgreen">Environment Name : </span
              ><Strong style="text-transform: uppercase; color: black">{{
                environment.name
              }}</Strong></Label
            >
            <hr />
            <Label
              ><span style="color: darkslateblue">Connection String : </span
              ><span style="color: black">{{
                environment.connection
              }}</span></Label
            >
            <br />
            <Label
              ><span style="color: darkslateblue">Database Name : </span
              ><span style="color: black">{{ environment.dbName }}</span></Label
            >
            <hr />
            <Label
              ><span style="color: brown">Description : </span>
              <span style="color: black">{{ environment.description }}</span>
            </Label>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
      </b-card>
    </div>
    <b-modal
      id="delete-modal"
      size="sm"
      button-size="sm"
      centered
      hide-header-close
    >
      <template #modal-header> </template>
      <template #default>
        Do you really want to delete this environment?
      </template>
      <template #modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="remove(), ok()">
          Delete
        </b-button>
        <b-button size="sm" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
    <b-modal
      id="edit-modal"
      size="lg"
      button-size="lg"
      centered
      hide-header-close
    >
      <template #modal-header> </template>
      <template #default>
        <b-form>
          <b-row
            id="input-group-1"
            style="margin-bottom: 2rem; margin-top: 2rem"
          >
            <b-col md="1"></b-col>
            <b-col md="2" style="text-align: left; padding-top: 0.5rem">
              <b-label style="color: black"> Environment Name : </b-label>
            </b-col>
            <b-col md="8">
              <b-form-group>
                <b-form-input
                  id="input-1"
                  v-model="modalEntity.name"
                  placeholder="New Environment"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="1"></b-col>
          </b-row>
          <b-row id="input-group-1" style="margin-bottom: 2rem">
            <b-col md="1"></b-col>
            <b-col md="2" style="text-align: left; padding-top: 0.5rem">
              <b-label style="color: black"> Connection String : </b-label>
            </b-col>
            <b-col md="8">
              <b-form-group>
                <b-form-input
                  id="input-1"
                  v-model="modalEntity.connection"
                  placeholder="example://localhost:8080"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="1"></b-col>
          </b-row>
          <b-row id="input-group-1" style="margin-bottom: 2rem">
            <b-col md="1"></b-col>
            <b-col md="2" style="text-align: left; padding-top: 0.5rem">
              <b-label style="color: black"> Database Name : </b-label>
            </b-col>
            <b-col md="8">
              <b-form-group>
                <b-form-input
                  id="input-1"
                  v-model="modalEntity.dbName"
                  placeholder="New Database"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="1"></b-col>
          </b-row>
          <b-row id="input-group-1" style="margin-bottom: 2rem">
            <b-col md="1"></b-col>
            <b-col md="2" style="text-align: left; padding-top: 0.5rem">
              <b-label style="color: black"> Description : </b-label>
            </b-col>
            <b-col md="8">
              <b-form-group>
                <b-form-textarea
                  id="input-4"
                  v-model="modalEntity.description"
                  size="lg"
                  placeholder="This is a new environment..."
                ></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col md="1"></b-col>
          </b-row>
          <b-row id="input-group-1" style="margin-bottom: 2rem">
            <b-col md="1"></b-col>
            <b-col md="2"></b-col>
            <b-col md="8"> </b-col>
            <b-col md="1"></b-col>
          </b-row>
        </b-form>
      </template>
      <template #modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click="edit(), ok()">
          Update
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
  connection: null,
  name: null,
  dbName: null,
  description: null,
};

export default {
  data() {
    return {
      environments: [],
      deleteEntity: null,
      entity: { ...schema },
      modalEntity: { ...schema },
    };
  },

  async mounted() {
    this.$vToastify.setSettings({
      position: "top-right",
      theme: "light",
      canTimeout: false,
    });
    this.reset();
  },

  methods: {
    ...mapActions({
      create: "Environment/create",
      update: "Environment/update",
      delete: "Environment/delete",
      list: "Environment/list",
    }),

    resetForm() {
      this.entity.name = null;
      this.entity.connection = null;
      this.entity.dbName = null;
      this.entity.description = null;
    },

    async save() {
      if (this.entity._id) {
        await this.update(this.entity);
      } else {
        await this.create(this.entity);
      }
      this.$vToastify.success("Environment Created.", "Success!");
      this.reset();
    },

    async edit() {
      await this.update(this.modalEntity);
      this.$vToastify.success("Environment Updated.", "Success!");
      this.reset();
    },

    async remove() {
      await this.delete(this.deleteEntity._id);
      this.$vToastify.success("Environment Deleted.", "Success!");
      this.reset();
    },

    async reset() {
      this.entity = { ...schema };
      const { data } = await this.list();
      this.environments = data;
    },

    setDeletedEntity(item) {
      this.deleteEntity = item;
    },

    setSelectedEntity(item) {
      this.modalEntity = { ...item };
    },
    check() {
      if (
        this.entity.name === null ||
        this.entity.connection === null ||
        this.entity.dbName === null
      ) {
        this.$vToastify.warning("Please fill required inputs!", "Warning!");
      }else{
        this.save();
      }
    },
  },
};
</script>

<style scoped>
</style>
