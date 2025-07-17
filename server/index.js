const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Budget API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const Budget = require("./models/Budget") ;

//POST route
app.post("/api/budgets", async(req,res) => {
  console.log("✅ POST /api/budgets hit")
  try{  
    const{ title, amount, category, date } = req.body;

    if (!title || !amount || !category ||!date){
        return res.status(400).json({message : "All fields are required."});
    }

    const newBudget = new Budget({ title,amount, category, date});
    await newBudget.save();

    res.status(201).json(newBudget);
    }catch(err){
    console.error("POST error:",err);
    res.status(500).json({message:"Failed to create the Budget entry.."})
  }
});

//GET route
app.get("/api/budgets",async(req, res)=>{
  try{
    const budgets = await Budget.find();
    res.json(budgets);
  }catch(err){
    console.error("GET error:",err);
    res.status(500).json({message: "Failed to fetch the entries."})
  }
});