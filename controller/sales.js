const Sales = require("../models/sales");
const soldStock = require("../controller/soldStock");

// Add Sales
const addSales = (req, res) => {
  const addSale = new Sales({
    ProductID: req.body.productID,
    StoreID: req.body.storeID,
    StockSold: req.body.stockSold,
    SaleDate: req.body.saleDate,
    AreaResponsable: req.body.areaResponsable,
    Responsable: req.body.responsable,
    ValeSalida: req.body.valeSalida,
  });

  addSale
    .save()
    .then((result) => {
      soldStock(req.body.productID, req.body.stockSold);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Sales Data
const getSalesData = async (req, res) => {
  const findAllSalesData = await Sales.find()
    .sort({ _id: -1 })
    .populate("ProductID")
    .populate("StoreID");
  res.json(findAllSalesData);
};

// Get total sales amount
const getTotalSalesAmount = async (req, res) => {
  let totalSaleAmount = 0;
  const salesData = await Sales.find();
  salesData.forEach((sale) => {
    totalSaleAmount += sale.TotalSaleAmount;
  });
  res.json({ totalSaleAmount });
};

const getMonthlySales = async (req, res) => {
  try {
    const sales = await Sales.find();

    const salesAmount = Array(12).fill(0);

    sales.forEach((sale) => {
      const monthIndex = parseInt(sale.SaleDate.split("-")[1]) - 1;
      salesAmount[monthIndex] += sale.TotalSaleAmount;
    });

    res.status(200).json({ salesAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addSales, getMonthlySales, getSalesData, getTotalSalesAmount };
