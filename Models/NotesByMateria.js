const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const NotesByM = new Schema(
  {
    titulo: { type: String, required: true },
    estado: { type: Boolean, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: String, required: true },
    materia: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotesByM", NotesByM);