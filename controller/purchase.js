const Purchase = require("../models/purchase");
const purchaseStock = require("./purchaseStock");

// Add Purchase Details
const addPurchase = async (req, res) => {
  try {
    const addPurchaseDetails = new Purchase({
      ProductID: req.body.productID,
      Lote: req.body.lote,
      Referencia: req.body.referencia,
      UnidadMedida: req.body.unidadMedida,
      CantidadEmpaques: req.body.cantidadEmpaques,
      CantidadPorEmaque: req.body.cantidadPorEmaque,
      QuantityPurchased: req.body.quantityPurchased,
      PurchaseDate: req.body.purchaseDate,
      Temperatura: req.body.temperatura,
      Caducidad: req.body.caducidad,
      Documento: req.body.documento,
      Proveedor: req.body.proveedor,
      Marca: req.body.marca,
    });

    const result = await addPurchaseDetails.save();
    await purchaseStock(req.body.productID, req.body.quantityPurchased);
    res.status(200).send(result);
  } catch (err) {
    res.status(402).send(err);
  }
};

// Get All Purchase Data
const getPurchaseData = async (req, res) => {
  try {
    const findAllPurchaseData = await Purchase.find()
      .sort({ _id: -1 })
      .populate("ProductID");
    res.json(findAllPurchaseData);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get total purchase amount
const getTotalPurchaseAmount = async (req, res) => {
  try {
    let totalPurchaseAmount = 0;
    const purchaseData = await Purchase.find();
    purchaseData.forEach((purchase) => {
      totalPurchaseAmount += purchase.QuantityPurchased;
    });
    res.json({ totalPurchaseAmount });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { addPurchase, getPurchaseData, getTotalPurchaseAmount };
