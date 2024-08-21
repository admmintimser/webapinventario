const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
// models/Inventario.js
const inventarioSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidadDisponible: { type: Number, required: true },
    caducidad: { type: Date },
    lote: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Inventario', inventarioSchema);