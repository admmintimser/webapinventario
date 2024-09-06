import express from "express";
import {
    createEntrada,  
    getEntradas,
    getEntrada,  
    updateEntrada,  
    deleteEntrada
    }  from "../controllers/entradaController.js";

const router = express.Router();

router.post('/',  createEntrada);
router.get('/',  getEntradas);
router.get('/:id',  getEntrada);
router.put('/:id',  updateEntrada);
router.delete('/:id',  deleteEntrada);

export default router;

