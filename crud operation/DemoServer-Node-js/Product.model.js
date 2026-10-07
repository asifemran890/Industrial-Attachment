const {Schema, model} = require("mongoose");


const productSchema = new Schema({
    productName:String,
    description:String,
    inStock:Boolean,
    price:Number,
})


const productModel = model("Producs",productSchema)
module.exports = productModel;