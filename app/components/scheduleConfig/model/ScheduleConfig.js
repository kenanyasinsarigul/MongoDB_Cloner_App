const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  sources: [{ type: Schema.Types.ObjectId, ref: "Environment", autopopulate: true, required: true }],
  target: { type: Schema.Types.ObjectId, ref: "Environment", autopopulate: true, required: true },
  time: { type: String, required: true },
});

schema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("ScheduleConfig", schema);
