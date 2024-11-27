const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  buyername: { 
    type: String,
     trim: true
     },
  nationalid: {
     type: String,
      trim: true
     },
  location: {
     type: String,
      trim: true
     },
  contact: { 
    type: String,
     trim: true
     },
  amountdue: {
     type: Number,
      trim: true
     },
  salesagent: {
     type: String, 
     trim: true 
    },
  duedate: {
     type: Date,
      trim: true 
    },
  producename: { 
    type: String, 
    trim: true 
  },
  producttype: {
     type: String,
      trim: true
     },
  tonnage: { 
    type: Number,
     trim: true
     },
  dispatchdate: { 
    type: Date, 
    trim: true
   },
});


module.exports = mongoose.model('Credit', creditSchema);


