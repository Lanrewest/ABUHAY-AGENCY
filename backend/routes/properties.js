const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { files: 5 } });
const { createProperty, getProperties, getProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');

// Accept up to 5 images
router.post('/', protect, upload.array('images', 5), createProperty);
router.get('/', getProperties);
router.get('/:id', getProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;