const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const { verifyProperty, featureProperty, getAllLeads, getAllUsers } = require('../controllers/adminController');

router.put('/verify-property/:id', protect, authorize('admin'), verifyProperty);
router.put('/feature-property/:id', protect, authorize('admin'), featureProperty);
router.get('/leads', protect, authorize('admin'), getAllLeads);
router.get('/users', protect, authorize('admin'), getAllUsers);

module.exports = router;