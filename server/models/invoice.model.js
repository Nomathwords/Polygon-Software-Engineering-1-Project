const mongoose = require("mongoose");

// Invoice database model
const Invoice = new mongoose.Schema(
  {
    ponumber: { type: String, require: true },
    date: { type: String, require: true },
    billfrom: { type: String, require: true },
    billto: { type: String, require: true },
    service: { type: String, require: true },
    charges: { type: String, require: true },
    taxrate: { type: String },
    totalcharge: { type: String },
    notes: { type: String },
  },
  { collection: "invoice-data" }
);

const model = mongoose.model("InvoiceData", Invoice);

module.exports = model;
