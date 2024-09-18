// controllers/entradaController.js
import { Entrada } from '../models/Entrada.js';
import { Inventario }  from '../models/Inventario.js';
import { Producto } from '../models/Producto.js';

export const createEntrada = async (req, res) => {
    try {
        const entrada = new Entrada(req.body);
        await entrada.save();

        // Find inventory based on product, batch, and location
        let inventario = await Inventario.findOne({ producto: entrada.producto, lote: entrada.lote, ubicacion: entrada.ubicacion });

        // Fetch product details to calculate the total quantity
        const producto = await Producto.findById(entrada.producto);
        const cantidadToAdd = entrada.cantidadEmpaques * producto.cantidadPorEmpaque;

        if (inventario) {
            // If inventory exists, update available quantity
            inventario.cantidadDisponible += cantidadToAdd;
            inventario.caducidad = entrada.fechaCaducidad; // Update expiration date if needed
            await inventario.save();
        } else {
            // If inventory doesn't exist, create a new inventory record
            inventario = new Inventario({
                producto: entrada.producto,
                cantidadDisponible: cantidadToAdd,
                caducidad: entrada.fechaCaducidad,
                lote: entrada.lote,
                ubicacion: entrada.ubicacion
            });
            await inventario.save();
        }

        res.status(201).json(entrada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getEntradas = async (req, res) => {
    try {
        const entradas = await Entrada.find().populate('producto ubicacion');
        res.status(200).json(entradas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getEntrada = async (req, res) => {
    try {
        const entrada = await Entrada.findById(req.params.id).populate('producto ubicacion');
        if (!entrada) {
            return res.status(404).json({ error: "Entrada no encontrada" });
        }
        res.status(200).json(entrada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateEntrada = async (req, res) => {
    try {
        const entrada = await Entrada.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entrada) {
            return res.status(404).json({ error: "Entrada no encontrada" });
        }
        res.status(200).json(entrada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteEntrada = async (req, res) => {
    try {
        const entrada = await Entrada.findByIdAndDelete(req.params.id);
        if (!entrada) {
            return res.status(404).json({ error: "Entrada no encontrada" });
        }
        res.status(204).json({ message: "Entrada eliminada" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
