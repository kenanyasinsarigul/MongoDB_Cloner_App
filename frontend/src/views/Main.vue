<template>
  <div>
    <div class="container">
      <b-tabs
        active-nav-item-class="font-weight-bold text-uppercase text-dark"
        style="margin-top: 1.5rem"
      >
        <b-tab style="padding-top: 3rem" title="CLONER" active
          ><Cloner
        /></b-tab>
        <b-tab style="padding-top: 3rem" title="ENVIRONMENTS"
          ><EnvironmentPage
        /></b-tab>
        <b-tab style="padding-top: 3rem" title="SCHEDULE"
          ><SchedulePage
        /></b-tab>
      </b-tabs>
    </div>
    <div class="footer container" style="text-align: center">
      <hr />
      <span>MONGODB CLONER</span>
      <img src="../../public/img/phexumlogo.png" style="width: 7%; float: right; background-color: black; padding: 0.5rem; border-radius: 5px;">
      <span style="float: left">2024</span>
    </div>
  </div>
</template>

<script>
import Cloner from "../views/Cloner.vue";
import EnvironmentPage from "../views/Environment.vue";
import SchedulePage from "../views/Schedule.vue";

export default {
  components: {
    Cloner,
    EnvironmentPage,
    SchedulePage,
  },
};
</script>

<style scoped>
.footer {
  position: static;
  bottom: 0;
  width: 100%;
  height: 5rem;
  margin-top: 3rem;
}
</style>
