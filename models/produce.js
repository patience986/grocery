const mongoose = require('mongoose');

// Define the schema for the produce model
const produceSchema = new mongoose.Schema({
  producename: {
    type: String,
    trim: true, 
  },
  typeofproduce: {
    type: String,
    trim: true, 
  },
  source: {
    type: String,
    trim: true,
  },
  dateTime: {
    type: Date,
  },
  tonnage: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  branch: {
    type: String,
    trim: true, // Trims leading and trailing whitespace
  },
  contact: {
    type: String,
    trim: true, // Trims leading and trailing whitespace
  },
  selling_price: {
    type: Number,
  },
});

// Create the Produce model from the schema
const Produce = mongoose.model('Produce', produceSchema);

module.exports = Produce;
