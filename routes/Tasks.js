import express from "express";
import Task from "../models/Tasks.js";
import requireLogin from "../middleware/LoginChecker.js";
const Taskrouter=express.Router()

Taskrouter.post("/addTask",requireLogin,async(req,res)=>{
   const {title,task}=req.body
   const newtask=new Task({title,task})
   await newtask.save()
    res.status(201).json({message:"Task Added Successfully"})
})
Taskrouter.get("/getTasks",requireLogin,async(req,res)=>{
    const tasks=await Task.find()
     res.status(201).json(tasks)
})
Taskrouter.delete("/:id", requireLogin, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, userId: req.session.userId });
  res.send({ message: "Deleted!" });
});
export default Taskrouter;