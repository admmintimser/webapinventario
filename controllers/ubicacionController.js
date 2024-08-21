// controllers/ubicacionController.js
const Ubicacion = require('../models/Ubicacion');
const Inventario = require('../models/Inventario');

exports.getUbicaciones = async (req, res) => {
    try {
        // Fetch all locations
        const ubicaciones = await Ubicacion.find();

        // For each location, count the number of products associated with it
        const ubicacionesWithProductCount = await Promise.all(
            ubicaciones.map(async (ubicacion) => {
                const productCount = await Inventario.countDocuments({ ubicacion: ubicacion._id });
                return {
                    ...ubicacion.toObject(),
                    productCount, // Add the product count to each location
                };
            })
        );

        res.status(200).json(ubicacionesWithProductCount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProductsByUbicacion = async (req, res) => {
    try {
        const products = await Inventario.find({ ubicacion: req.params.id }).populate('producto');
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createUbicacion = async (req, res) => {
    try {
        const ubicacion = new Ubicacion(req.body);
        await ubicacion.save();
        res.status(201).json(ubicacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUbicacion = async (req, res) => {
    try {
        const ubicacion = await Ubicacion.findById(req.params.id);
        if (!ubicacion) {
            return res.status(404).json({ error: "Ubicación no encontrada" });
        }
        res.status(200).json(ubicacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUbicacion = async (req, res) => {
    try {
        const ubicacion = await Ubicacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ubicacion) {
            return res.status(404).json({ error: "Ubicación no encontrada" });
        }
        res.status(200).json(ubicacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUbicacion = async (req, res) => {
    try {
        const ubicacion = await Ubicacion.findByIdAndDelete(req.params.id);
        if (!ubicacion) {
            return res.status(404).json({ error: "Ubicación no encontrada" });
        }
        res.status(204).json({ message: "Ubicación eliminada" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
