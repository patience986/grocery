const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    producename: {
        type: String,
        trim: true,
    },
    tonnage: {
        type: Number,
        trim: true,
    },
    amountpaid: {
        type: Number,
        trim: true,
    },
    buyername: {
        type: String,
        trim: true,
    },
    salesagent: {
        type: String,
        trim: true,
    },
    branch: {
        type: String,
        trim: true,
    },
    datetime: {
        type: Date,
        trim: true,
    }
});

module.exports = mongoose.model('sales', salesSchema);