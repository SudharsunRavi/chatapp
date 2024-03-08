const sendMessage=async(req,res)=>{
    res.json({message:'Message sent successfully'});
}

module.exports={sendMessage};