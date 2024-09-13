import { Destino } from "../models/Destino.js";
import { Salida } from "../models/Salida.js";
import { Inventario } from "../models/Inventario.js";

export const createDestino = async (req, res) => {
    try {
        const destino = new Destino(req.body);
        await destino.save();
        res.status(201).json(destino);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los destinos
  export const getDestinos = async (req, res) => {
    try {
        const destinos = await Destino.find().populate('productos.producto');
        res.status(200).json(destinos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un destino por ID
  export const getDestino = async (req, res) => {
    try {
        const destino = await Destino.findById(req.params.id).populate('productos.producto');
        if (!destino) {
            return res.status(404).json({ error: "Destino no encontrado" });
        }
        res.status(200).json(destino);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un destino
  export const updateDestino = async (req, res) => {
    try {
        const destino = await Destino.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!destino) {
            return res.status(404).json({ error: "Destino no encontrado" });
        }
        res.status(200).json(destino);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un destino
  export const deleteDestino = async (req, res) => {
    try {
        const destino = await Destino.findByIdAndDelete(req.params.id);
        if (!destino) {
            return res.status(404).json({ error: "Destino no encontrado" });
        }
        res.status(204).json({ message: "Destino eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createSalidaDestino = async (req, res) => {
    try {
        const { producto, cantidadSalida, ubicacion, destino } = req.body;

        // Obtener inventarios disponibles para el producto en la ubicación dada
        let inventarios = await Inventario.find({ producto, ubicacion }).sort({ createdAt: 1 });

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
            return res.status(400).json({ error: 'Cantidad de salida excede la cantidad disponible en inventario.' });
        }

        // Registrar la salida en el destino
        const salida = new Salida({
            producto,
            cantidadSalida,
            ubicacion,
            destino,
            fechaSalida: Date.now()
        });
        await salida.save();

        res.status(201).json(salida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las salidas hacia destinos
export const getSalidas = async (req, res) => {
    try {
        const salidas = await Salida.find().populate('producto destino ubicacion');
        res.status(200).json(salidas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una salida por ID
export const getSalidaById = async (req, res) => {
    try {
        const salida = await Salida.findById(req.params.id).populate('producto destino ubicacion');
        if (!salida) {
            return res.status(404).json({ error: 'Salida no encontrada.' });
        }
        res.status(200).json(salida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




// Obtener los productos asociados a un destino
export const getProductosPorDestino = async (req, res) => {
    try {
        const destinoId = req.params.id;

        // Buscar las salidas relacionadas con el destino
        const salidas = await Salida.find({ destino: destinoId }).populate('producto').exec();

        if (salidas.length === 0) {
            return res.status(404).json({ error: 'No hay productos asociados con este destino.' });
        }

        // Mapear las salidas para devolver solo la información del producto
        const productos = salidas.map(salida => ({
            producto: salida.producto,
            cantidad: salida.cantidadSalida,
            fechaMovimiento: salida.fechaSalida,
            comentario: salida.comentario || ''
        }));

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener las salidas asociadas a un destino
export const getSalidasPorDestino = async (req, res) => {
    try {
        const destinoId = req.params.id;

        // Buscar todas las salidas relacionadas con el destino
        const salidas = await Salida.find({ destino: destinoId }).populate('producto').exec();

        if (salidas.length === 0) {
            return res.status(404).json({ error: 'No hay salidas asociadas con este destino.' });
        }

        res.status(200).json(salidas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
