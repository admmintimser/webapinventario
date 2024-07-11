const express = require("express");
const router = express.Router();
const purchaseController = require("../controller/purchase");

// Add Purchase
router.post("/add", purchaseController.addPurchase);

// Get All Purchase Data
router.get("/get", purchaseController.getPurchaseData);

// Get Total Purchase Amount
router.get("/totalpurchaseamount", purchaseController.getTotalPurchaseAmount);

module.exports = router;
