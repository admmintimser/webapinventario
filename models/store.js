const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    manufacturer: { type: String },
    stock: { type: Number },
    categoria: { type: String },
    sku: { type: String },
    descripcion: { type: String },
    marca: { type: String },
    presentacion: { type: String },
    UM: { type: String },
    cantidadpresentacion: { type: String },
    codigointernto: { type: String },
    moneda: { type: String },
    prioridad: { type: String },
    tiempoentrega: { type: String },
  },
  { _id: false }
);

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    almacen: {
      type: String,
      required: true,
    },
    empresa: {
      type: String,
      required: true,
    },
    products: [ProductSchema],
  },
  { timestamps: true }
);

const Store = mongoose.models.Store || mongoose.model("Store", StoreSchema);
module.exports = Store;
