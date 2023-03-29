const User = require('../models/Users')
const ClientUser =  require('../models/clientUser'); 
require('../models/clientUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database');
const Clients = require('../models/Client');
require('dotenv').config();

function generateAccessToken(id){
    return jwt.sign({userId:id},process.env.SECRET);
}

function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

const register = async(req,res)=>{
    try {
        const {email,password} =req.body;
        if(isstringinvalid(email || isstringinvalid(password))){
            return res.status(400).json({err: "Bad parameters . Something is missing"})
        }
        const findEmail =await User.findOne({where:{email:email}});
   if(findEmail){
    return res.status(200).json({success:true,message:'Email already exist'});
   }
   const saltrounds = 10;
   bcrypt.hash(password,saltrounds,async(err,hash)=>{
     await User.create({email,password:hash})
     return res.status(200).json({success:true,message:"User signup successfully"});
   })

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const login = async (req, res) => {
    try{
    const { email, password } = req.body;
    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({message: 'EMail id or password is missing ', success: false})
    }
  
    const user  = await User.findAll({ where : { email }})
        if(user.length > 0){
           bcrypt.compare(password, user[0].password, (err, result) => {
           if(err){
            throw new Error('Something went wrong')
           }
            if(result === true){
                return res.status(200).json({success: true, message: "User logged in successfully",token:generateAccessToken(user[0].id)});
            }
            else{
            return res.status(400).json({success: false, message: 'Password is incorrect'})
           }
        })
        } else {
            return res.status(404).json({success: false, message: 'User Doesnot exitst'})
        }
    }catch(err){
        res.status(500).json({ success: false})
    }
}

const unclaimedClient = async(req,res)=>{
    try {
        const getClients = await Client.findAll({where:{isclaimed:false},attributes:["id",
        "name",
        "email",
        "courseinterest"]});
        return res.status(200).json({success:true,data:getClients});

    } catch (error) {
        return res.status(500).json({success:false});
    }
}

const claimClient = async(req,res)=>{
    const t = await sequelize.transaction();
    try {
         const {id} = req.user;
          const clientId = req.params.clientid;
      await Client.update({isclaimed:true},{where:{id:clientId}},{transaction:t});
      const clientUser  =   await ClientUser.create({clientId:clientId,userId:id},{transaction:t});
      if(clientUser){
        await  t.commit();
     return res.status(200).json({success:true});  
      }
      else{
        await t.rollback();
        return res.status(400).json({success:false});
      }
         
   
    } catch (error) {
        console.log(error)
        await  t.rollback()
        return res.status(500).json({success:false});
    }
}

const claimedClient = async(req,res)=>{
    try {
        const {id} = req.user;
        const getClients = await Clients.findAll({where:{id:[sequelize.literal(`(SELECT clientId FROM clientUsers where userId=${id})`)]},attributes:["id",
        "name",
        "email",
        "courseinterest"]});
   
        return res.status(200).json({success:true,data:getClients});

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false});
    }
}



module.exports = {
    register,
    login,
    unclaimedClient,
    claimClient,
    claimedClient
}