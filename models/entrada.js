import mongoose from "mongoose";

const entradaSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    lote: { type: String, required: true },  // Lote is required based on the frontend form
    cantidadEmpaques: { type: Number, required: true },
    precioCompra: { type: Number, required: true },  // Add precioCompra field
    monedaCompra: { type: String, required: true },  // Add monedaCompra field
    temperaturaAlmacenamiento: { type: Number },  // Add temperaturaAlmacenamiento field
    fechaEntrada: { type: Date, default: Date.now },
    fechaCaducidad: { type: Date },
    ubicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Ubicacion', required: true },
}, {
    timestamps: true,
});

export const Entrada = mongoose.model('Entrada', entradaSchema);
