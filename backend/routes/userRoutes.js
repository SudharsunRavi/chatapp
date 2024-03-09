const router=require('express').Router();

const validateAccessToken = require('../middlewares/accessTokenValidation');
const userController = require('../controllers/userController');

router.get("/", validateAccessToken, userController.getUsers)

module.exports=router;