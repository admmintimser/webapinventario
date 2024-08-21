// controllers/entradaController.js
const Entrada = require('../models/Entrada');
const Inventario = require('../models/Inventario'); 
const Producto = require('../models/Producto');

exports.createEntrada = async (req, res) => {
    try {
        const entrada = new Entrada(req.body);
        await entrada.save();

        // Find the product in the inventory
        let inventario = await Inventario.findOne({ producto: entrada.producto, lote: entrada.lote });

        // Fetch the product details to get `cantidadPorEmpaque`
        const producto = await Producto.findById(entrada.producto);
        const cantidadToAdd = entrada.cantidadEmpaques * producto.cantidadPorEmpaque;

        if (inventario) {
            // Update existing inventory
            inventario.cantidadDisponible += cantidadToAdd;
            inventario.caducidad = entrada.fechaCaducidad; // Update the expiration date if necessary
            await inventario.save();
        } else {
            // Create a new inventory record if the product/lote combination doesn't exist
            inventario = new Inventario({
                producto: entrada.producto,
                cantidadDisponible: cantidadToAdd,
                caducidad: entrada.fechaCaducidad,
                lote: entrada.lote,
            });
            await inventario.save();
        }

        res.status(201).json(entrada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEntradas = async (req, res) => {
    try {
        const entradas = await Entrada.find().populate('producto');
        res.status(200).json(entradas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEntrada = async (req, res) => {
    try {
        const entrada = await Entrada.findById(req.params.id).populate('producto');
        if (!entrada) {
            return res.status(404).json({ error: "Entrada no encontrada" });
        }
        res.status(200).json(entrada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateEntrada = async (req, res) => {
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

exports.deleteEntrada = async (req, res) => {
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
