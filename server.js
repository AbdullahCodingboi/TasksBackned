import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import router from "./routes/auth.js";
import session from "express-session";
import Taskrouter from "./routes/Tasks.js";
dotenv.config()
connectDB()
const app=express();
app.use(express.json())
app.get("/",(req,res)=>{res.send("API up")})
app.listen(3000,() => console.log("Server running on http://localhost:3000"))
app.use(
  session({
    secret: "super-secret-key",  // change this in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: false, // true if using https
    },
  })
);

app.post("/post",async (req, res)=>{
  try{
  const body=req.body
  const user=await User.create(body)
    res.status(201).json(user);
    }
    catch(err){
      res.status(500).send(err)
    }
})
app.get("/get/:id",async(req,res)=>{
  try{
    const id=req.params.id
    const user=User.findById(id)
    if (!user) res.status(404).json({ message: "User not found" });
    else res.status(201).json(user)
  }
  catch(err){
    res.status(500).send(err)
  }
})
app.use("/api/auth",router)
app.use("/api/tasks",Taskrouter)