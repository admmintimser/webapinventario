import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

// Initialize the AutoIncrement plugin with mongoose
const AutoIncrement = mongooseSequence(mongoose);

const ubicacionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    empresa: { type: String, required: true }
}, {
    timestamps: true,
});

export const Ubicacion = mongoose.model('Ubicacion', ubicacionSchema);
