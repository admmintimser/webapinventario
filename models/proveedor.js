const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
// models/Proveedor.js
const proveedorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    razonSocial: { type: String, required: true },
    direccion: { type: String, required: true },
    correo: { type: String, required: true },
    activo: { type: Boolean, default: true },
    clasificacion1: { type: String },
    clasificacion2: { type: String },
    detalles: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Proveedor', proveedorSchema);