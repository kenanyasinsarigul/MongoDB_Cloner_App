const express = require("express");
const router = express.Router();

const ScheduleConfigService = require("../service/ScheduleConfig");
const SchedulelarService = require("../service/SchedulelarService");

router.get("/", async (req, res) => {
  const results = await ScheduleConfigService.findAll();

  return res.json(results);
});

router.post("/", async (req, res) => {
  const results = await ScheduleConfigService.create(req.body);

  SchedulelarService.restartCron();

  return res.json(results);
});

router.delete("/:id", async (req, res) => {
  const results = await ScheduleConfigService.deleteById(req.params.id);

  return res.json(results);
});

router.put("/", async (req, res) => {
  const results = await ScheduleConfigService.update(req.body);

  return res.json(results);
});

module.exports = router;
