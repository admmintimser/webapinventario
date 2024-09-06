import mongoose from "mongoose";

// models/Inventario.js
const inventarioSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidadDisponible: { type: Number, required: true },
    caducidad: { type: Date },
    lote: { type: String },
    ubicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Ubicacion', required: true },  // Nuevo campo
}, {
    timestamps: true,
});

export const Inventario = mongoose.model('Inventario', inventarioSchema);
