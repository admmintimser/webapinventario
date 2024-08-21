// controllers/inventarioController.js
const Inventario = require('../models/Inventario');

exports.createInventario = async (req, res) => {
    try {
        const inventario = new Inventario(req.body);
        await inventario.save();
        res.status(201).json(inventario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getInventarios = async (req, res) => {
    try {
        const inventarios = await Inventario.find().populate('producto');
        res.status(200).json(inventarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getInventario = async (req, res) => {
    try {
        const inventario = await Inventario.findById(req.params.id).populate('producto');
        if (!inventario) {
            return res.status(404).json({ error: "Inventario no encontrado" });
        }
        res.status(200).json(inventario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateInventario = async (req, res) => {
    try {
        const inventario = await Inventario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!inventario) {
            return res.status(404).json({ error: "Inventario no encontrado" });
        }
        res.status(200).json(inventario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteInventario = async (req, res) => {
    try {
        const inventario = await Inventario.findByIdAndDelete(req.params.id);
        if (!inventario) {
            return res.status(404).json({ error: "Inventario no encontrado" });
        }
        res.status(204).json({ message: "Inventario eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
