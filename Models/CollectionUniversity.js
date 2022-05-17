const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const Collection = new Schema(
  // Coleccion que equivale a la Universidad 
  {
    name: { type: String, required: true },
    ciudad: { type: String, required: true },
    semestre: { type: String, required: true },
    _idUser: { type: String, required: true },
    carrera: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", Collection);