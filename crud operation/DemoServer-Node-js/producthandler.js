const productMaodel = require("../Product.model");

async function postHandler (req,res){
    const {productName,description,inStock,price} = req.body;
    let createProduct = new productModel({
        productName,
        description,
        inStock,
        price

    });
    const result = await createProduct.save();

    console.log("Product created on DB");
    console.log(result)


    res.status(200).json({
        success:true,
        message:"successfully product created",
        data:result
    })
    
}






 async function getHandler (req,res){

    const result = await productMaodel.find({})

    console.log("Product fetched from DB");
    console.log(result)


    res.status(200).json({
        success:true,
        message:"successfully products fetched",
        data:result
    })
    
}




async function updateHandler (req,res){
    const {productName,description,inStock,price} = req.body;
    const productId = req.query.id
    console.log(productId)


    // const updateProduct = await productMaodel.findByIdAndUpdate();

    // console.log("Product created on DB");
    // console.log(result)


    // res.status(200).json({
    //     success:true,
    //     message:"successfully product created",
    //     data:result
    // })
    
}


module.exports = {
    postHandler,getHandler,updateHandler
}