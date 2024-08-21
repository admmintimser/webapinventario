const RequisicionCompra = require('../models/RequisicionCompra');
const Inventario = require('../models/Inventario');
const Entrada = require('../models/Entrada');
// Crear una nueva requisición de compra
exports.createRequisicionCompra = async (req, res) => {
    try {
        const requisicionCompra = new RequisicionCompra(req.body);
        await requisicionCompra.save();
        res.status(201).json(requisicionCompra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las requisiciones de compra
exports.getRequisicionesCompra = async (req, res) => {
    try {
        const requisicionesCompra = await RequisicionCompra.find().populate('productos.producto');
        res.status(200).json(requisicionesCompra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una requisición de compra por ID
exports.getRequisicionCompra = async (req, res) => {
    try {
        const requisicionCompra = await RequisicionCompra.findById(req.params.id).populate('productos.producto');
        if (!requisicionCompra) {
            return res.status(404).json({ error: "Requisición de compra no encontrada" });
        }
        res.status(200).json(requisicionCompra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una requisición de compra
exports.updateRequisicionCompra = async (req, res) => {
    try {
        const requisicionCompra = await RequisicionCompra.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!requisicionCompra) {
            return res.status(404).json({ error: "Requisición de compra no encontrada" });
        }
        res.status(200).json(requisicionCompra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una requisición de compra
exports.deleteRequisicionCompra = async (req, res) => {
    try {
        const requisicionCompra = await RequisicionCompra.findByIdAndDelete(req.params.id);
        if (!requisicionCompra) {
            return res.status(404).json({ error: "Requisición de compra no encontrada" });
        }
        res.status(204).json({ message: "Requisición de compra eliminada" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.approveRequisicionCompra = async (req, res) => {
    try {
        const requisicionCompra = await RequisicionCompra.findById(req.params.id).populate('productos.producto');
        if (!requisicionCompra) {
            return res.status(404).json({ error: "Requisición de compra no encontrada" });
        }

        // Verificar si ya está aprobada
        if (requisicionCompra.aprobacion) {
            return res.status(400).json({ error: "La requisición ya está aprobada" });
        }

        // Agregar productos al inventario y crear registro de entrada
        for (const item of requisicionCompra.productos) {
            let existingInventario = await Inventario.findOne({ producto: item.producto._id });

            if (existingInventario) {
                existingInventario.cantidadDisponible += item.cantidadSolicitada;
                await existingInventario.save();
            } else {
                existingInventario = new Inventario({
                    producto: item.producto._id,
                    cantidadDisponible: item.cantidadSolicitada,
                    caducidad: item.producto.caducidad, // Suponiendo que `caducidad` es un campo en Producto
                    lote: item.producto.lote // Suponiendo que `lote` es un campo en Producto
                });
                await existingInventario.save();
            }

            // Crear un nuevo registro en Entrada
            const nuevaEntrada = new Entrada({
                producto: item.producto._id,
                lote: item.producto.lote,
                cantidadEmpaques: item.cantidadSolicitada,
                temperatura: null, // Suponiendo que la temperatura no es relevante en este contexto
                fechaCaducidad: item.producto.caducidad, // Suponiendo que `caducidad` es un campo en Producto
            });

            await nuevaEntrada.save();
        }

        // Marcar la requisición como aprobada
        requisicionCompra.aprobacion = true;
        await requisicionCompra.save();

        res.status(200).json({ message: "Requisición aprobada, productos añadidos al inventario y registro de entrada creado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

