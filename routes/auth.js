import express from "express";
import User from "../models/User.js";
import bycrypt from "bcryptjs";
const router=express.Router()

router.post("/register",async(req,res)=>{
const {name,email,password}=req.body
const hashedpass=await bycrypt.hash(password,10)
const user=await User.create({name:name,email,password:hashedpass})
await user.save()
res.status(201).json({message:"User Registered Successfully"})
})

router.post("/login",async(req,res)=>{
 const {email,password}=req.body
    const user=await User.findOne({ email });
    if(!user) res.status(400).send({ error: "Invalid email or password" });

    const isMatch=await bycrypt.compare(password,user.password)

    if (!isMatch) return res.status(400).send({ error: "Invalid email or password" });
    req.session.userId = user._id; 
    res.send({ message: "Logged in!" });
})

export default router;