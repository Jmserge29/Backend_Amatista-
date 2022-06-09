const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const User = new Schema(
  {
    codeStudent: { type: String, unique: true ,required: true },
    name: { type: String, required: true },
    _userIg: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    
  }, 
  {
    timestamps: true,
    versionkey: false
  }
);

User.methods.encryptPassword = async (password) =>{
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt)
}

User.methods.ValidatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", User);