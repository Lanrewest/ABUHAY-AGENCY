const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    buyerName: String,
    buyerPhone: String,
    buyerEmail: String,
    message: String,
    isSold: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);