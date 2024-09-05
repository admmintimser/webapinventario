// models/Producto.js
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' },
    marca: { type: String },
    presentacion: { type: String },
    unidadMedida: { type: String },
    codigoInterno: { type: String, unique: true },
    sku: { type: String, unique: true },
    cantidadPorEmpaque: { type: Number, required: true },
    alcancePreventix: { type: Boolean, default: false },
    temperaturaAlmacenamiento: {type: Number}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Producto', productoSchema);












