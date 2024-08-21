// controllers/proveedorController.js
const Proveedor = require('../models/Proveedor');

exports.createProveedor = async (req, res) => {
    try {
        const proveedor = new Proveedor(req.body);
        await proveedor.save();
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }
        res.status(200).json(proveedor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }
        res.status(200).json(proveedor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }
        res.status(204).json({ message: "Proveedor eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
