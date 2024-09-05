const mongoose = require("mongoose");

const entradaSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    lote: { type: String },
    cantidadEmpaques: { type: Number, required: true },
    temperatura: { type: Number },
    fechaEntrada: { type: Date, default: Date.now },
    fechaCaducidad: { type: Date },
    ubicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Ubicacion', required: true }, // Nueva ubicación
}, {
    timestamps: true,
});

module.exports = mongoose.model('Entrada', entradaSchema);
