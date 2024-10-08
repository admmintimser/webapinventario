// controllers/productoController.js

import { Producto } from "../models/Producto.js";

  export const createProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  export const getProductos = async (req, res) => {
    try {
      const productos = await Producto.find().populate('proveedor');
      res.status(200).json(productos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const getProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('proveedor');
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  export const updateProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  export const deleteProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(204).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

