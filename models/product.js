const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    stock: {
      type: Number,
    },
    categoria: String,
    almacen: String,
    sku: String,
    descripcion: String,
    marca: String,
    presentacion: String,
    UM: String,
    cantidadpresentacion: String,
    codigointernto: String,
    moneda: String,
    prioridad: String,
    tiempoEntrega: String,
    transito: String,
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
module.exports = Product;
