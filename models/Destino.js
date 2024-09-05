// models/Destino.js
const mongoose = require("mongoose");

const destinoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    productos: [{
        producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        cantidad: { type: Number, default: 0 },
        fechaMovimiento: { type: Date, default: Date.now },
        comentario: { type: String }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Destino', destinoSchema);
