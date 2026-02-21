const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');
// const Lead = require('../models/Lead'); // Assuming you have a Lead model
// const Property = require('../models/Property');

// @desc    Create a new lead/enquiry
// @route   POST /api/leads
// @access  Public (or Private depending on your logic)
router.post('/', async(req, res) => {
    const { propertyId, buyerName, buyerEmail, buyerPhone, message, sellerEmail } = req.body;

    try {
        // 1. Save Lead to Database (Implementation depends on your Lead model)
        // const lead = await Lead.create({ ... });

        // 2. Send Notification Email to Seller/Agent
        const emailContent = `
      <h1>New Property Enquiry</h1>
      <p><strong>Property ID:</strong> ${propertyId}</p>
      <p><strong>Buyer Name:</strong> ${buyerName}</p>
      <p><strong>Email:</strong> ${buyerEmail}</p>
      <p><strong>Phone:</strong> ${buyerPhone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `;

        // If sellerEmail is provided in the request (or fetched from DB), send to them
        // Otherwise send to admin
        const recipient = sellerEmail || process.env.EMAIL_USER;

        await sendEmail({
            to: recipient,
            subject: `New Enquiry from ${buyerName}`,
            html: emailContent,
        });

        // 3. Send Confirmation to Buyer
        await sendEmail({
            to: buyerEmail,
            subject: 'We received your enquiry',
            html: `<p>Hi ${buyerName},</p><p>Thanks for your interest. We have received your message and will get back to you shortly.</p>`,
        });

        res.status(201).json({ message: 'Enquiry sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send enquiry' });
    }
});

module.exports = router;