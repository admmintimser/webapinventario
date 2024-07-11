const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
   
    Lote: {type: String,},
    Referencia	: {type: String,},
    UnidadMedida	: {type: String,},
    CantidadEmpaques	: {type: String,},
    CantidadPorEmaque	: {type: String,},
    QuantityPurchased	: {type: Number,},
    PurchaseDate	: {type: String,},
    Temperatura	: {type: String,},
    Caducidad	: {type: String,},
    Documento	: {type: String,},
    Proveedor : {type: String},
    Marca: {type: String,},
  },
  { timestamps: true }
);


const Purchase = mongoose.model("purchase", PurchaseSchema);
module.exports = Purchase;
