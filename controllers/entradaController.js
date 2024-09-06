// controllers/entradaController.js
import { Entrada } from '../models/Entrada.js';
import { Inventario }  from '../models/Inventario.js';
import { Producto } from '../models/Producto.js';

export const createEntrada = async (req, res) => {
    try {
        const entrada = new Entrada(req.body);
        await entrada.save();

        // Encontrar el inventario asociado al producto, lote y ubicación
        let inventario = await Inventario.findOne({ producto: entrada.producto, lote: entrada.lote, ubicacion: entrada.ubicacion });

        // Obtener detalles del producto para calcular la cantidad total a agregar
        const producto = await Producto.findById(entrada.producto);
        const cantidadToAdd = entrada.cantidadEmpaques * producto.cantidadPorEmpaque;

        if (inventario) {
            // Si ya existe en el inventario, actualizar la cantidad disponible
            inventario.cantidadDisponible += cantidadToAdd;
            inventario.caducidad = entrada.fechaCaducidad; // Actualizar la fecha de caducidad si es necesario
            await inventario.save();
        } else {
            // Si no existe, crear un nuevo registro en el inventario
            inventario = new Inventario({
                producto: entrada.producto,
                cantidadDisponible: cantidadToAdd,
                caducidad: entrada.fechaCaducidad,
                lote: entrada.lote,
                ubicacion: entrada.ubicacion // Asociar la ubicación
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
