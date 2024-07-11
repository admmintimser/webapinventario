const Store = require("../models/store");

// Add Store
const addStore = async (req, res) => {
  const addStore = new Store({
    name: req.body.name,
    almacen: req.body.almacen,
    empresa: req.body.empresa,
    products: req.body.products || [],
  });

  addStore.save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find({}).sort({ _id: -1 });
  res.json(findAllStores);
};

// Add Product to Store
const addProductToStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).send("Store not found");
    }
    store.products.push(req.body.product);
    await store.save();
    res.status(200).send(store);
  } catch (err) {
    res.status(402).send(err);
  }
};

// Bulk Add Stores
const bulkAddStores = async (req, res) => {
  try {
    const stores = req.body.stores;
    if (!Array.isArray(stores) || stores.length === 0) {
      return res.status(400).send("Invalid input, array of stores is required");
    }

    const result = await Store.insertMany(stores);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { addStore, getAllStores, addProductToStore, bulkAddStores };
