const express=require('express');
const app=express();

const dotenv=require('dotenv').config();
const cookieParser=require('cookie-parser');    

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes=require('./routes/userRoutes')

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})