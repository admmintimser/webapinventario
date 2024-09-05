const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://timsercrm:preventixpass20@cluster0.xfum3w2.mongodb.net/";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host} `);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;

