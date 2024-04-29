const mongoose = require("mongoose");

// User database model
const User = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    invoices: { type: Array },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
