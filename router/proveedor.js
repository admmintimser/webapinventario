const express = require("express");
const router = express.Router();
const proveedor = require("../controller/proveedor");

// Add Proveedor
router.post("/add", proveedor.addProveedor);

// Get All Proveedores
router.get("/get", proveedor.getAllProveedores);

// Delete Selected Proveedor
router.delete("/delete/:id", proveedor.deleteSelectedProveedor);

// Update Selected Proveedor
router.post("/update", proveedor.updateSelectedProveedor);

// Search Proveedor
router.get("/search", proveedor.searchProveedor);

module.exports = router;
