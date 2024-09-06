import express from "express";
import {
    createRequisicionSalida,  
    getRequisicionesSalida,
    getRequisicionSalida,  
    updateRequisicionSalida,  
    deleteRequisicionSalida
    }  from "../controllers/requisicionSalidaController.js";

const router = express.Router();
router.post('/',createRequisicionSalida);
router.get('/',getRequisicionesSalida);
router.get('/:id',getRequisicionSalida);
router.put('/:id',updateRequisicionSalida);
router.delete('/:id',deleteRequisicionSalida);

export default router;
