const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ubicacionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    empresa: { type: String, required: true }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Ubicacion', ubicacionSchema);
