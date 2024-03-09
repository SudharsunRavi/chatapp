const router=require('express').Router();

const {sendMessage, getMessages}=require('../controllers/messageController');
const validateAccessToken = require('../middlewares/accessTokenValidation');

router.post('/send/:id', validateAccessToken, sendMessage)
router.get('/:id', validateAccessToken, getMessages)

module.exports=router;