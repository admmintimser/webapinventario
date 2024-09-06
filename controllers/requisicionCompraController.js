import { RequisicionCompra } from '../models/RequisicionCompra.js';
import { Inventario } from '../models/Inventario.js';
import { Entrada } from '../models/Entrada.js';

// Crear una nueva requisición de compra
export const createRequisicionCompra = async (req, res) => {
    try {
        const requisicionCompra = new RequisicionCompra(req.body);
        await requisicionCompra.save();
        res.status(201).json(requisicionCompra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las requisiciones de compra
export const getRequisicionesCompra = async (req, res) => {
    try {
        const requisicionesCompra = await RequisicionCompra.find().populate('productos.producto');
        res.status(200).json(requisicionesCompra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una requisición de compra por ID
export const getRequisicionCompra = async (req, res) => {
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

// Actualizar el estatus de un producto en una requisición de compra
export const updateProductStatus = async (req, res) => {
    try {
        const { id, productId } = req.params;
        const { estatus } = req.body;

        if (!['Entregado', 'Transito', 'Pendiente'].includes(estatus)) {
            return res.status(400).json({ error: 'Estatus no válido' });
        }

        const requisicionCompra = await RequisicionCompra.findById(id);
        if (!requisicionCompra) {
            return res.status(404).json({ error: "Requisición de compra no encontrada" });
        }

        const producto = requisicionCompra.productos.find(p => p.producto.toString() === productId);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado en esta requisición" });
        }

        producto.estatus = estatus;
        await requisicionCompra.save();

        res.status(200).json({ message: "Estatus del producto actualizado", producto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una requisición de compra
export const deleteRequisicionCompra = async (req, res) => {
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

// Aprobar una requisición de compra
export const approveRequisicionCompra = async (req, res) => {
    try {
        const requisicionCompra = await RequisicionCompra.findById(req.params.id).populate('productos.producto');
        if (!requisicionCompra) {
            return res.status(404).json({ error: "Requisición de compra no encontrada" });
        }

        if (requisicionCompra.aprobacion) {
            return res.status(400).json({ error: "La requisición ya está aprobada" });
        }

        for (const item of requisicionCompra.productos) {
            let existingInventario = await Inventario.findOne({ producto: item.producto._id });

            if (existingInventario) {
                existingInventario.cantidadDisponible += item.cantidadSolicitada;
                await existingInventario.save();
            } else {
                existingInventario = new Inventario({
                    producto: item.producto._id,
                    cantidadDisponible: item.cantidadSolicitada,
                    caducidad: item.producto.caducidad,
                    lote: item.producto.lote
                });
                await existingInventario.save();
            }

            const nuevaEntrada = new Entrada({
                producto: item.producto._id,
                lote: item.producto.lote,
                cantidadEmpaques: item.cantidadSolicitada,
                temperatura: null,
                fechaCaducidad: item.producto.caducidad,
            });

            await nuevaEntrada.save();
        }

        requisicionCompra.aprobacion = true;
        await requisicionCompra.save();

        res.status(200).json({ message: "Requisición aprobada, productos añadidos al inventario y registro de entrada creado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una requisición de compra
export const updateRequisicionCompra = async (req, res) => {
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
