const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const Task = new Schema(
  {
    name: { type: String, required: true },
    fechaEntrega: { type: String, required: true },
    difficulty: { type: String, required: true },
    estado: { type: Boolean, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    materias: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", Task);