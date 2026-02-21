const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    type: { type: String, enum: ['sale', 'rent'], default: 'sale' },
    category: { type: String, enum: ['land', 'house', 'shop', 'other'], default: 'house' },
    subCategory: {
        type: String,
        enum: [
            'Duplex', 'Flat', 'Bungalow', 'Terrace', 'Detached', 'Semi-detached', 'Apartment',
            'Land', 'Shop', 'Office', 'Warehouse', 'Other'
        ],
        default: 'Apartment'
    },
    location: {
        state: String,
        city: String,
        area: String
    },
    images: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isVerified: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);