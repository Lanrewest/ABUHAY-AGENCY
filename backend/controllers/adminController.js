const User = require('../models/User');
exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) { res.status(500).json({ message: err.message }); }
};
const Property = require('../models/Property');
const Lead = require('../models/Lead');

exports.verifyProperty = async(req, res) => {
    try {
        const prop = await Property.findById(req.params.id);
        if (!prop) return res.status(404).json({ message: 'Not found' });
        prop.isVerified = true;
        await prop.save();
        res.json(prop);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.featureProperty = async(req, res) => {
    try {
        const prop = await Property.findById(req.params.id);
        if (!prop) return res.status(404).json({ message: 'Not found' });
        prop.isFeatured = !prop.isFeatured;
        await prop.save();
        res.json(prop);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllLeads = async(req, res) => {
    try {
        const leads = await Lead.find().populate('propertyId').sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) { res.status(500).json({ message: err.message }); }
};