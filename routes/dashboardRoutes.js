const express = require('express');
const router = express.Router();
const Inventario = require('../models/Inventario');
const RequisicionSalida = require('../models/RequisicionSalida');
const Proveedor = require('../models/Proveedor');

// Producto con más stock
router.get('/product-most-stock', async (req, res) => {
    try {
        const product = await Inventario.findOne().sort('-cantidadDisponible');
        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product with most stock' });
    }
});

// Productos por agotarse
router.get('/products-about-to-run-out', async (req, res) => {
    try {
        const products = await Inventario.find({ cantidadDisponible: { $lt: 10 } });
        if (products.length === 0) {
            return res.status(404).json({ error: 'No products about to run out' });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products about to run out' });
    }
});

// Área con más entradas/salidas
router.get('/area-most-entries', async (req, res) => {
    try {
        const areas = await RequisicionSalida.aggregate([
            { $group: { _id: "$area", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 1 }
        ]);
        if (areas.length === 0) {
            return res.status(404).json({ error: 'No areas found' });
        }
        res.json(areas[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching area with most entries' });
    }
});

// Mayor proveedor
router.get('/top-supplier', async (req, res) => {
    try {
        const supplier = await Proveedor.aggregate([
            { $lookup: { from: 'entradas', localField: '_id', foreignField: 'proveedor', as: 'entradas' } },
            { $unwind: '$entradas' },
            { $group: { _id: '$_id', nombre: { $first: '$nombre' }, totalEntradas: { $sum: '$entradas.cantidadEmpaques' } } },
            { $sort: { totalEntradas: -1 } },
            { $limit: 1 }
        ]);
        if (supplier.length === 0) {
            return res.status(404).json({ error: 'No suppliers found' });
        }
        res.json(supplier[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching top supplier' });
    }
});

// Stock total y capacidad de pruebas
router.get('/total-stock-and-test-capacity', async (req, res) => {
    try {
        const totalStock = await Inventario.aggregate([{ $group: { _id: null, totalStock: { $sum: "$cantidadDisponible" } } }]);
        const preventix = await Inventario.findOne({ nombre: 'Preventix' }); // Si Preventix es un producto

        const testCapacity = preventix ? preventix.capacidadPruebas : 0;

        res.json({
            totalStock: totalStock[0]?.totalStock || 0,
            testCapacity: testCapacity || 0,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching total stock and test capacity' });
    }
});

module.exports = router;
