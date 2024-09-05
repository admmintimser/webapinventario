// models/Salida.js
const mongoose = require("mongoose");

const salidaSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    fechaSalida: { type: Date, default: Date.now },
    cantidadSalida: { type: Number, required: true },
    destino: { type: mongoose.Schema.Types.ObjectId, ref: 'Destino', required: true },
    ubicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Ubicacion', required: true }, // Relación con Ubicacion
}, {
    timestamps: true,
});

module.exports = mongoose.model('Salida', salidaSchema);
