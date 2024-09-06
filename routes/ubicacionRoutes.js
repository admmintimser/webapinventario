import express from "express";
const router = express.Router();

import {
    createUbicacion,  
    getUbicaciones,
    getProductsByUbicacion,  
    getUbicacion,  
    updateUbicacion, 
    deleteUbicacion,
    bulkUploadUbicaciones
    }  from "../controllers/ubicacionController.js";


router.post('/',  createUbicacion);
router.get('/',  getUbicaciones);

// Place this route before the `/:id` route
router.get('/:id/productos',getProductsByUbicacion);

router.get('/:id',  getUbicacion);
router.put('/:id',  updateUbicacion);
router.delete('/:id',  deleteUbicacion);

router.post('/bulk-upload',  bulkUploadUbicaciones);

export default router;


