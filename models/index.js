const mongoose = require("mongoose");
const uri = "mongodb+srv://timsercrm:preventixpass20@cluster0.xfum3w2.mongodb.net/almacen";


function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };