const mongoose = require("mongoose");
const itemsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    min: 0,
    required: true,
  },
  list: {
    type: String,
    enum: ["fever", "Covid-19", "Cough", "Others"],
  },
  date: {
    type: String,
  },
});
const model = mongoose.model;
const items = model("items", itemsSchema);

module.exports = items;
