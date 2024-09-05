// controllers/salidaController.js
const Salida = require('../models/Salida');
const Inventario = require('../models/Inventario');
const Producto = require('../models/Producto');
const Destino = require('../models/Destino'); 


exports.createSalida = async (req, res) => {
    try {
        const { producto, cantidadSalida, ubicacion } = req.body;

        // Obtener todas las entradas de inventario para el producto, lote y ubicación
        const inventarios = await Inventario.find({ producto, ubicacion }).sort({ createdAt: 1 });

        let cantidadRestante = cantidadSalida;

        for (let inventario of inventarios) {
            if (cantidadRestante <= 0) break;

            if (inventario.cantidadDisponible >= cantidadRestante) {
                inventario.cantidadDisponible -= cantidadRestante;
                cantidadRestante = 0;
                await inventario.save();
            } else {
                cantidadRestante -= inventario.cantidadDisponible;
                inventario.cantidadDisponible = 0;
                await inventario.save();
            }
        }

        if (cantidadRestante > 0) {
            return res.status(400).json({ error: 'Cantidad de salida supera la cantidad disponible en el inventario' });
        }

        // Crear la nueva salida si la cantidad restante es 0
        const salida = new Salida(req.body);
        await salida.save();
        res.status(201).json(salida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getSalidas = async (req, res) => {
    try {
        const { destino } = req.query;
        let query = {};

        // Si se pasa un destino en la consulta, filtra por ese destino
        if (destino && ['Toma de Muestra', 'WIP', 'Proceso', 'Merma'].includes(destino)) {
            query.destino = destino;
        }

        const salidas = await Salida.find(query).populate('producto').populate('destino'); // Asegúrate de popular 'destino'
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
