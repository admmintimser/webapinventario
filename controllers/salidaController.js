// controllers/salidaController.js
const Salida = require('../models/Salida');
const Inventario = require('../models/Inventario');
const Producto = require('../models/Producto');

exports.createSalida = async (req, res) => {
    try {
        const { producto, cantidadSalida } = req.body;

        // Find the product in the inventory
        let inventario = await Inventario.findOne({ producto: producto });

        if (!inventario) {
            return res.status(404).json({ error: "Producto no encontrado en el inventario" });
        }

        // Check if there is enough inventory to cover the salida
        if (inventario.cantidadDisponible < cantidadSalida) {
            return res.status(400).json({ error: "No hay suficiente cantidad disponible en el inventario" });
        }

        // Update the inventory quantity
        inventario.cantidadDisponible -= cantidadSalida;

        if (inventario.cantidadDisponible === 0) {
            // Optionally, remove the inventory record if the quantity is 0
            await Inventario.findByIdAndDelete(inventario._id);
        } else {
            await inventario.save();
        }

        // Create and save the salida record
        const salida = new Salida(req.body);
        await salida.save();

        res.status(201).json(salida);
    } catch (error) {
        console.error("Error creating salida:", error);
        res.status(400).json({ error: error.message });
    }
};

exports.getSalidas = async (req, res) => {
    try {
        const salidas = await Salida.find().populate('producto');
        res.status(200).json(salidas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSalida = async (req, res) => {
    try {
        const salida = await Salida.findById(req.params.id).populate('producto');
        if (!salida) {
            return res.status(404).json({ error: "Salida no encontrada" });
        }
        res.status(200).json(salida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateSalida = async (req, res) => {
    try {
        const salida = await Salida.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!salida) {
            return res.status(404).json({ error: "Salida no encontrada" });
        }
        res.status(200).json(salida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteSalida = async (req, res) => {
    try {
        const salida = await Salida.findByIdAndDelete(req.params.id);
        if (!salida) {
            return res.status(404).json({ error: "Salida no encontrada" });
        }
        res.status(204).json({ message: "Salida eliminada" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
