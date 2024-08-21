const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
// models/Salida.js
const salidaSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    fechaSalida: { type: Date, default: Date.now },
    cantidadSalida: { type: Number, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Salida', salidaSchema);