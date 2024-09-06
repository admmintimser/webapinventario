import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

// Initialize the AutoIncrement plugin with mongoose
const AutoIncrement = mongooseSequence(mongoose);

// Define the schema
const requisicionSalidaSchema = new mongoose.Schema({
  area: { type: String, required: true },
  nombreSolicitante: { type: String, required: true },
  fechaSolicitud: { type: Date, default: Date.now },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidadSolicitada: { type: Number, required: true }
    }
  ],
  folioSalida: { type: Number, unique: true },
});

// Apply the AutoIncrement plugin to the schema
requisicionSalidaSchema.plugin(AutoIncrement, { inc_field: 'folioSalida' });

// Export the model
export const RequisicionSalida = mongoose.model('RequisicionSalida', requisicionSalidaSchema);

