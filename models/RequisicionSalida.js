const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

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

requisicionSalidaSchema.plugin(AutoIncrement, { inc_field: 'folioSalida' });

module.exports = mongoose.model('RequisicionSalida', requisicionSalidaSchema);
