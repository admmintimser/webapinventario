import { Proveedor } from "../models/Proveedor.js";

  export const createProveedor = async (req, res) => {
    try {
        const proveedor = new Proveedor(req.body);
        await proveedor.save();
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  export const getProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  export const getProveedor = async (req, res) => {
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

  export const updateProveedor = async (req, res) => {
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

  export const deleteProveedor = async (req, res) => {
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
  export const uploadProveedoresMasivos = async (req, res) => {
    try {
        const proveedores = req.body.proveedores; // Supone que el JSON tendrá un array de proveedores

        // Guardar los proveedores en la base de datos
        const result = await Proveedor.insertMany(proveedores);

        res.status(201).json({ message: 'Proveedores subidos exitosamente', data: result });
    } catch (error) {
        res.status(400).json({ error: 'Error al subir los proveedores: ' + error.message });
    }
};
