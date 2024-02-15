import axios from "axios";

const actions = {
  list({ commit, state }) {
    return axios.get("/schedule-config");
  },
  create({ commit, state }, entity) {
    return axios.post("/schedule-config", entity);
  },
  update({ commit, state }, entity) {
    return axios.put("/schedule-config", entity);
  },
  delete({ commit, state }, id) {
    return axios.delete("/schedule-config/" + id);
  },
  clone({ commit, state }, entity) {
    return axios.post("/cloner/clone-time", entity);
  },
};

export default {
  namespaced: true,
  actions,
};
