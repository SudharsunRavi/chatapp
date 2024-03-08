const express=require('express');
const app=express();

const dotenv=require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})