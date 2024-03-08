const router=require('express').Router();

const {sendMessage}=require('../controllers/messageController');

router.post('/send/:id', sendMessage)

module.exports=router;