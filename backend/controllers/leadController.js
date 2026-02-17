const Lead = require('../models/Lead');
const Property = require('../models/Property');

exports.createLead = async(req, res) => {
    try {
        const { propertyId, buyerName, buyerPhone, buyerEmail, message } = req.body;
        const property = await Property.findById(propertyId);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        const lead = await Lead.create({ propertyId, buyerName, buyerPhone, buyerEmail, message });
        // TODO: notify seller/admin via email/WhatsApp
        res.status(201).json(lead);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getLeads = async(req, res) => {
    try {
        const q = {};
        const leads = await Lead.find(q).populate('propertyId').sort({ createdAt: -1 }).limit(100);
        res.json(leads);
    } catch (err) { res.status(500).json({ message: err.message }); }
};