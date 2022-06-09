const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const NotesG = new Schema(
  {
    titulo: { type: String, required: true },
    estado: { type: Boolean, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: String, required: true },
    collectionUniversity: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotesG", NotesG);