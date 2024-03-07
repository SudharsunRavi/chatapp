const express=require('express');
const app=express();

const dotenv=require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})