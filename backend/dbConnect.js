const {Pool}=require('pg')
const dotenv=require('dotenv').config()

const pool=new Pool({
    user: "postgres",
    host: "localhost",
    database: "chatapp",
    password: "susan",
    port: 5432
})

module.exports=pool;