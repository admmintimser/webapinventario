const Product = require("../models/product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");

// Add Post
const addProduct = (req, res) => {
  const addProduct = new Product({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    stock: req.body.stock || 0,
    categoria: req.body.categoria,
    sku: req.body.sku,
    descripcion: req.body.descripcion,
    marca: req.body.marca,
    presentacion: req.body.presentacion,
    UM: req.body.UM,
    cantidadpresentacion: req.body.cantidadpresentacion,
    codigointernto: req.body.codigointernto,
    moneda: req.body.moneda,
    prioridad: req.body.prioridad,
    tiempoentrega: req.body.tiempoentrega,
  });

  addProduct
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Bulk Add Products
const bulkAddProducts = async (req, res) => {
  try {
    const products = req.body.products;
    const results = await Product.insertMany(products);
    res.status(200).json(results);
  } catch (err) {
    res.status(402).send(err);
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({}).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllProducts);
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  const deleteProduct = await Product.deleteOne({ _id: req.params.id });
  const deletePurchaseProduct = await Purchase.deleteOne({ ProductID: req.params.id });
  const deleteSaleProduct = await Sales.deleteOne({ ProductID: req.params.id });
  res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  try {
    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        categoria: req.body.categoria,
        sku: req.body.sku,
        marca: req.body.marca,
        presentacion: req.body.presentacion,
        UM: req.body.UM,
        cantidadpresentacion: req.body.cantidadpresentacion,
        codigointernto: req.body.codigointernto,
        moneda: req.body.moneda,
        prioridad: req.body.prioridad,
        tiempoentrega: req.body.tiempoentrega,
      },
      { new: true }
    );
    res.json(updatedResult);
  } catch (error) {
    res.status(402).send("Error");
  }
};

// Search Products
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

module.exports = {
  addProduct,
  bulkAddProducts,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};
