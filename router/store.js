const express = require("express");
const router = express.Router();
const storeController = require("../controller/store");

// Add Store 
router.post("/add", storeController.addStore);

// Get All Stores
router.get("/get", storeController.getAllStores);

// Add Product to Store
router.post("/add-product/:storeId", storeController.addProductToStore);

// Bulk Add Stores
router.post("/bulk-add", storeController.bulkAddStores);

module.exports = router;
