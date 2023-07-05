require('dotenv').config()
const express=require('express')
const app = express()

const port = process.env.PORT

console.log("-----/Env Vars------");
console.log(process.env) 
console.log("-----/Env Vars------");
app.listen(port)