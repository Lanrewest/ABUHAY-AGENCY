const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary storage
const fs = require('fs');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
router.get('/', async(req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
router.get('/:id', async(req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.json(property);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @desc    Create a property
// @route   POST /api/properties
// @access  Private
router.post('/', upload.array('images'), async(req, res) => {
    try {
        const { title, description, price, type, category, subCategory, bedrooms, bathrooms } = req.body;

        const imageUrls = [];
        if (req.files) {
            for (const file of req.files) {
                const url = await cloudinary.upload(file.path);
                imageUrls.push(url);
                fs.unlinkSync(file.path); // Remove temp file
            }
        }

        const newProperty = new Property({
            title,
            description,
            price,
            type,
            category,
            subCategory,
            bedrooms,
            bathrooms,
            location: req.body.location || {}, // Handle location object from body-parser
            images: imageUrls,
            user: "60d0fe4f5311236168a109ca" // Placeholder ID until auth middleware is active
        });

        const property = await newProperty.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;