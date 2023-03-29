const Client = require('../models/Client');


function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

const enquiry = async(req,res)=>{
    try {
        const {name,email,courseinterest} = req.body;
        if(isstringinvalid(email || isstringinvalid(name)||isstringinvalid(courseIntrest))){
            return res.status(400).json({err: "Bad parameters . Something is missing"})
        }
        await Client.create({
            name,email,courseinterest
        })
return res.status(200).json({success:true,msg:"enquiry sent successfully"});
        

    } catch (error) {
   
        return res.status(500).json({msg:"invalid parameters"});
    }
}

module.exports={
    enquiry
}