const Property = require('../models/Property');

const { upload: cloudinaryUpload } = require('../utils/cloudinary');
const fs = require('fs');

exports.createProperty = async(req, res) => {
    try {
        // Destructure to separate location fields from the rest of the body
        const { state, city, area, ...rest } = req.body;
        const data = {...rest, location: { state, city, area } };

        data.sellerId = req.user._id;
        let images = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const url = await cloudinaryUpload(file.path);
                images.push(url);
                fs.unlinkSync(file.path); // remove local file
            }
        }
        data.images = images;
        const prop = await Property.create(data);
        res.status(201).json(prop);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProperties = async(req, res) => {
    try {
        const q = req.query || {};
        const props = await Property.find(q).sort({ createdAt: -1 }).limit(50);
        res.json(props);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProperty = async(req, res) => {
    try {
        const prop = await Property.findById(req.params.id);
        if (!prop) return res.status(404).json({ message: 'Not found' });
        prop.views += 1;
        await prop.save();
        res.json(prop);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateProperty = async(req, res) => {
    try {
        const prop = await Property.findById(req.params.id);
        if (!prop) return res.status(404).json({ message: 'Not found' });
        if (prop.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
        Object.assign(prop, req.body);
        await prop.save();
        res.json(prop);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteProperty = async(req, res) => {
    try {
        const prop = await Property.findById(req.params.id);
        if (!prop) return res.status(404).json({ message: 'Not found' });
        if (prop.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
        await prop.remove();
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
};