import { connect as _connect } from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://timsercrm:preventixpass20@cluster0.xfum3w2.mongodb.net/";

const connectDB = async () => {
  try {
    const connect = await _connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected - ${connect.connection.host}`);
  } catch (err) {
    console.error(`Database error: ${err}`);
    process.exit(1); // Exit with failure
  }
};

export { connectDB };
