
import { Destino } from "../models/Destino.js";
// Crear un nuevo destino
  export const createDestino = async (req, res) => {
    try {
        const destino = new Destino(req.body);
        await destino.save();
        res.status(201).json(destino);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los destinos
  export const getDestinos = async (req, res) => {
    try {
        const destinos = await Destino.find().populate('productos.producto');
        res.status(200).json(destinos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un destino por ID
  export const getDestino = async (req, res) => {
    try {
        const destino = await Destino.findById(req.params.id).populate('productos.producto');
        if (!destino) {
            return res.status(404).json({ error: "Destino no encontrado" });
        }
        res.status(200).json(destino);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un destino
  export const updateDestino = async (req, res) => {
    try {
        const destino = await Destino.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!destino) {
            return res.status(404).json({ error: "Destino no encontrado" });
        }
        res.status(200).json(destino);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un destino
  export const deleteDestino = async (req, res) => {
    try {
        const destino = await Destino.findByIdAndDelete(req.params.id);
        if (!destino) {
            return res.status(404).json({ error: "Destino no encontrado" });
        }
        res.status(204).json({ message: "Destino eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
