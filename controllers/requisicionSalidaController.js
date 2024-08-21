// controllers/requisicionSalidaController.js
const RequisicionSalida = require('../models/RequisicionSalida');

exports.createRequisicionSalida = async (req, res) => {
    try {
        const requisicionSalida = new RequisicionSalida(req.body);
        await requisicionSalida.save();
        res.status(201).json(requisicionSalida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRequisicionesSalida = async (req, res) => {
    try {
        const requisicionesSalida = await RequisicionSalida.find().populate('productos.producto');
        res.status(200).json(requisicionesSalida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRequisicionSalida = async (req, res) => {
    try {
        const requisicionSalida = await RequisicionSalida.findById(req.params.id).populate('productos.producto');
        if (!requisicionSalida) {
            return res.status(404).json({ error: "Requisición de salida no encontrada" });
        }
        res.status(200).json(requisicionSalida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateRequisicionSalida = async (req, res) => {
    try {
        const requisicionSalida = await RequisicionSalida.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!requisicionSalida) {
            return res.status(404).json({ error: "Requisición de salida no encontrada" });
        }
        res.status(200).json(requisicionSalida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRequisicionSalida = async (req, res) => {
    try {
        const requisicionSalida = await RequisicionSalida.findByIdAndDelete(req.params.id);
        if (!requisicionSalida) {
            return res.status(404).json({ error: "Requisición de salida no encontrada" });
        }
        res.status(204).json({ message: "Requisición de salida eliminada" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
