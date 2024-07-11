const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    StoreID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
      required: true,
    },
    StockSold: {
      type: Number,
      required: true,
    },
    SaleDate: {
      type: String,
      required: true,
    },
    AreaResponsable:{
      type: String,
    },
    Responsable:{
      type: String,
    },
    ValeSalida:{
      type: String,
    },
    
  },
  { timestamps: true }
);

const Sales = mongoose.model("sales", SaleSchema);
module.exports = Sales;
