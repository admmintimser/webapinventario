import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

// Initialize the AutoIncrement plugin with mongoose
const AutoIncrement = mongooseSequence(mongoose);

const requisicionCompraSchema = new mongoose.Schema({
    area: { type: String, required: true },
    nombreSolicitante: { type: String, required: true },
    productos: [{
        producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
        cantidadSolicitada: { type: Number, required: true },
        estatus: { type: String, enum: ['Entregado', 'Transito', 'Pendiente'], default: 'Pendiente' }  // Nuevo campo
    }],
    fechaSolicitud: { type: Date, default: Date.now },
    folioCompra: { type: Number, unique: true },
    aprobacion: { type: Boolean, default: false },
});

requisicionCompraSchema.plugin(AutoIncrement, { inc_field: 'folioCompra' });

export const RequisicionCompra = mongoose.model('RequisicionCompra', requisicionCompraSchema);
