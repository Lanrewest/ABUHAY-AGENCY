const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary storage
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

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
router.post('/', protect, upload.array('images'), async(req, res) => {
    try {
        const { title, description, price, type, category, subCategory, bedrooms, bathrooms } = req.body;

        // Parse location if it comes as a string (common with FormData)
        let location = req.body.location;
        if (typeof location === 'string') {
            // If location is sent as separate fields like location[city], multer handles it, 
            // but if sent as a JSON string, parse it.
            // Based on frontend code: data.append('location[city]', ...);
            // Express body parser with extended: true usually handles nested objects, 
            // but with multer, req.body might be flat.
            // Let's construct it manually if needed or rely on body parser.
        }

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
            location: req.body.location, // Multer + body-parser should handle 'location[city]'
            images: imageUrls,
            user: req.user._id
        });

        const property = await newProperty.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;