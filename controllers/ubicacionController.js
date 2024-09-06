import { Inventario } from "../models/Inventario.js";
import { Producto } from "../models/Producto.js";
import { Ubicacion } from "../models/Ubicacion.js";

  export const getUbicaciones = async (req, res) => {
    try {
        // Fetch all locations
        const ubicaciones = await Ubicacion.find();

        // For each location, count the number of products associated with it
        const ubicacionesWithProductCount = await Promise.all(
            ubicaciones.map(async (ubicacion) => {
                const productCount = await Producto.countDocuments({ ubicacion: ubicacion._id });
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

// Obtener productos por ubicación
  export const getProductsByUbicacion = async (req, res) => {
    try {
        const inventarios = await Inventario.find({ ubicacion: req.params.id }).populate('producto');  // Buscamos inventarios por ubicación
        if (inventarios.length === 0) {
            return res.status(404).json({ error: 'No hay productos en esta ubicación' });
        }
        res.status(200).json(inventarios);  // Devolvemos los inventarios, que ahora incluyen el producto y la cantidad disponible
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



  export const createUbicacion = async (req, res) => {
    try {
        const ubicacion = new Ubicacion(req.body);
        await ubicacion.save();
        res.status(201).json(ubicacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  export const getUbicacion = async (req, res) => {
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

  export const updateUbicacion = async (req, res) => {
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

  export const deleteUbicacion = async (req, res) => {
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

  export const bulkUploadUbicaciones = async (req, res) => {
    try {
        const ubicaciones = req.body; 
        
        if (!Array.isArray(ubicaciones)) {
            return res.status(400).json({ error: 'El formato del archivo debe ser un array de ubicaciones' });
        }

        const savedUbicaciones = await Ubicacion.insertMany(ubicaciones);
        res.status(201).json({ message: 'Ubicaciones subidas correctamente', savedUbicaciones });
    } catch (error) {
        res.status(400).json({ error: `Error al subir las ubicaciones: ${error.message}` });
    }
};