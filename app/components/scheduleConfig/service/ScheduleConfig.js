const repo = require("../repository/ScheduleConfig");

class ScheduleConfigService {
  constructor() {}

  async findAll() {
    return repo.findAll();
  }
  async create(entity) {
    await repo.deleteBy({});
    const config = await repo.create(entity);
    return config;
  }

  async deleteById(id) {
    return repo.deleteById(id);
  }
  async update(entity) {
    return repo.update(entity);
  }
}

module.exports = new ScheduleConfigService();
