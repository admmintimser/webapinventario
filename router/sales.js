const express = require("express");
const app = express();
const sales = require("../controller/sales");

// Add Sales
app.post("/add", sales.addSales);

// Get All Sales
app.get("/get", sales.getSalesData);
app.get("/getmonthly", sales.getMonthlySales);
app.get("/totalsaleamount", sales.getTotalSalesAmount);

module.exports = app;
