const express = require('express');
const router = express.Router();

// Contacts routes
router.use('/contacts', require('./contacts'));

module.exports = router;