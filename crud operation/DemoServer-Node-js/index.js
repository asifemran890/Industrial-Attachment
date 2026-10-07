const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const dbConnection = require("./DatabaseConnectin");
const {postHandler,getHandler, updateHandler} = require("./handler/producthandler")


const app = express();
app.use(express.json())

//Database conection
dbConnection();

app.post("/api/product",postHandler);
app.get("/api/products",getHandler);
app.put("/api/product/:id",updateHandler)




const Port = 3000;
app.listen(Port,()=>{
    console.log(`Server running on http://localhost:${Port}`)
})