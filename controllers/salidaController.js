import { Salida } from "../models/Salida.js";
import { Inventario } from "../models/Inventario.js";
import { Producto } from "../models/Producto.js";
import { Destino } from "../models/Destino.js";
import { Ubicacion } from "../models/Ubicacion.js";

export const createSalida = async (req, res) => {
    try {
        const { producto, cantidadSalida, ubicacion, destino } = req.body;

        // Verificar que el producto, destino y ubicación existen
        const productoObj = await Producto.findById(producto);
        const destinoObj = await Destino.findById(destino);
        const inventarios = await Inventario.find({ producto, ubicacion }).sort({ createdAt: 1 });

        if (!productoObj || !destinoObj) {
            return res.status(404).json({ error: "Producto o destino no encontrado." });
        }

        let cantidadRestante = cantidadSalida;

        // Actualizar el inventario
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

        // Crear la nueva salida
        const salida = new Salida({ producto, cantidadSalida, ubicacion, destino });
        await salida.save();

        res.status(201).json(salida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


  export const getSalidas = async (req, res) => {
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

  export const getSalida = async (req, res) => {
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

  export const updateSalida = async (req, res) => {
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

  export const deleteSalida = async (req, res) => {
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
