// models/Producto.js
import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

// Initialize the AutoIncrement plugin with mongoose
const AutoIncrement = mongooseSequence(mongoose);

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

export const Producto = mongoose.model('Producto', productoSchema);












