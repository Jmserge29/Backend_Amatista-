const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const Materias = new Schema(
  {
    name: { type: String, required: true },
    collectionUniversity: { type: String, required: true },
    teacher: { type: String, required: true },
    day_week: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Materias", Materias);