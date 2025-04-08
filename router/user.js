const express=require("express");
const bcrypt = require("bcrypt");
const User=require("../modules/schema");

const router =express.Router();

router.post('/register',async(req,res)=>{
    const {userName,email,password} = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({message:"All are required"})
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({userName,email,password: hashedPassword});
        await newUser.save();

        res.status(201).json({message:"user registered sucessfully"});
    }catch(err){
        res.status(500).json({message:"server error"})
    }
});

module.exports=router;