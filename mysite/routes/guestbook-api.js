const express = require('express');
const controller = require('../controllers/guestbook-api');

const router = express.Router();
router.route('').get(controller.read);


module.exports = router