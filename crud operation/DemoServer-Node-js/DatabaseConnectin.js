const mongoose = require("mongoose");


const dbConnection = () => {
    console.log("Connectin....")
    mongoose.connect(process.env.DBURL).then(() => {
        console.log("DB connection successfull")
    }).catch((err) => {
        console.log("db connectin err:", err)
    })

}

module.exports=dbConnection