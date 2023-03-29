const express =require('express');
const router = express.Router();

const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');


router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/clients',authMiddleware,userController.unclaimedClient)
router.get('/claim/:clientid',authMiddleware,userController.claimClient)
router.get('/claimed',authMiddleware,userController.claimedClient);

module.exports = router