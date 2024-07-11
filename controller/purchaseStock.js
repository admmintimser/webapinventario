const Purchase = require("../models/purchase");
const Product = require("../models/Product");

const purchaseStock = async (productID, purchaseStockData) => {
  try {
    const myProductData = await Product.findOne({ _id: productID });

    if (!myProductData) {
      throw new Error("Product not found");
    }

    const currentStock = parseInt(myProductData.stock, 10);
    const purchasedStock = parseInt(purchaseStockData, 10);

    if (isNaN(currentStock) || isNaN(purchasedStock)) {
      throw new Error("Invalid stock data");
    }

    const myUpdatedStock = currentStock + purchasedStock;

    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      { stock: myUpdatedStock },
      { new: true }
    );

    console.log("Updated product stock:", updatedProduct);
  } catch (error) {
    console.error("Error updating Purchase stock", error);
  }
};

module.exports = purchaseStock;
