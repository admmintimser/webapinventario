import express from "express";
import {
    createSalida,  
    getSalidas,
    getSalida,  
    updateSalida,  
    deleteSalida
    }  from "../controllers/salidaController.js";

const router = express.Router();

router.post('/', createSalida);
router.get('/', getSalidas);
router.get('/:id', getSalida);
router.put('/:id', updateSalida);
router.delete('/:id',deleteSalida);

export default router;

