const express =require('express');
const router = express.Router();

const clientController = require('../controllers/client');

router.post('/enquiry',clientController.enquiry);

module.exports =router;