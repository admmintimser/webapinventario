import express from "express";

import {
    createProveedor,  
    getProveedores,
    getProveedor,  
    updateProveedor,  
    deleteProveedor,
    uploadProveedoresMasivos

    }  from "../controllers/proveedorController.js";

const router = express.Router();

router.post('/',  createProveedor);
router.get('/',  getProveedores);
router.get('/:id',  getProveedor);
router.put('/:id',  updateProveedor);
router.delete('/:id',  deleteProveedor);
router.post('/upload-masivo',  uploadProveedoresMasivos);

export default router;

