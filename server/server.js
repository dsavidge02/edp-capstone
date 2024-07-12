import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors());
const PORT = 3000;

app.get("/ducks", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const ducks = await collection.find({}).toArray();
    res.json(ducks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something is wrong... No Ducks for you! ☹");
  }
});

//npm run start
//http://localhost:3000/ducks

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware to parse JSON bodies
app.use(express.json());

//search for ducks
app.post("/ducks/search", async (req, res) => {
  try {
    const {
      size,
      style,
      speed,
      condition,
      buoyancy,
      inStock,
      isFeatured,
      onSale,
      low,
      high,
      productName,
    } = req.body;

    console.log("Searching for ducks with filters:", {
      size,
      style,
      speed,
      condition,
      buoyancy,
      inStock,
      isFeatured,
      onSale,
      low,
      high,
      productName,
    });

    // connect to  MongoDB
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    //query object based on selected filters
    const query = {};
    if (productName) {
      query["productName"] = { $regex: productName, $options: "i" };
    }
    if (size && size.length > 0) query["duckDetails.size"] = { $in: size };
    if (style && style.length > 0) query["duckDetails.style"] = { $in: style };
    if (speed && speed.length > 0) query["duckDetails.speed"] = { $in: speed };
    if (condition && condition.length > 0)
      query["duckDetails.condition"] = { $in: condition };
    if (buoyancy !== undefined) query["additionalFeatures.buoyancy"] = buoyancy;
    if (inStock !== undefined) query["additionalFeatures.inStock"] = inStock;
    if (isFeatured !== undefined)
      query["additionalFeatures.isFeatured"] = isFeatured;
    if (onSale !== undefined) query["additionalFeatures.onSale"] = onSale;
    if (low || high) {
      query["duckDetails.price"] = {};
      // Min price
      if (low) query["duckDetails.price"]["$gte"] = parseFloat(low);
      // Max price
      if (high) query["duckDetails.price"]["$lte"] = parseFloat(high);
    }

    const ducks = await collection.find(query).toArray();

    if (ducks.length === 0) {
      return res
        .status(404)
        .send("No ducks found with the specified criteria.");
    }
    res.json(ducks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error searching for ducks");
  }
});
