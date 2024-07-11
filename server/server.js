import express from 'express';
import {MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors());
const PORT = 3000;

app.get('/ducks', async (req, res) => {
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
app.post('/ducks/search', async (req, res) => {
    try {
        const {
            sizes, styles, speeds, conditions, buoyancy, inStock, isFeatured, onSale,      
            minPrice, maxPrice, 
            sortBy,       
            sortOrder,    
        } = req.body;

        console.log("Searching for ducks with filters:", {
            sizes, styles, speeds, conditions, buoyancy, inStock, 
            isFeatured, onSale, minPrice, maxPrice, sortBy, sortOrder
        });

        // connect to  MongoDB 
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        //query object based on selected filters
        const query = {};

        if (sizes && sizes.length > 0) query['duckDetails.size'] = { $in: sizes };  
        if (styles && styles.length > 0) query['duckDetails.style'] = { $in: styles };  
        if (speeds && speeds.length > 0) query['duckDetails.speed'] = { $in: speeds };  
        if (conditions && conditions.length > 0) query['duckDetails.condition'] = { $in: conditions };  
        if (buoyancy !== undefined) query['additionalFeatures.buoyancy'] = buoyancy; 
        if (inStock !== undefined) query['additionalFeatures.inStock'] = inStock;  
        if (isFeatured !== undefined) query['additionalFeatures.isFeatured'] = isFeatured;  
        if (onSale !== undefined) query['additionalFeatures.onSale'] = onSale;  
        if (minPrice || maxPrice) {
            // Price range filtre
            query['duckDetails.price'] = {};  
            // Min price
            if (minPrice) query['duckDetails.price']['$gte'] = parseFloat(minPrice);  
            // Max price
            if (maxPrice) query['duckDetails.price']['$lte'] = parseFloat(maxPrice);  
        }

        // sort obj
        const sort = {};
        if (sortBy) {
            sort[`duckDetails.${sortBy}`] = sortOrder === 'desc' ? -1 : 1;
        }

        // find ducks with matching  filters
        const ducks = await collection.find(query).sort(sort).toArray();

        console.log("Found ducks:", ducks);
        if (ducks.length === 0) {
            return res.status(404).send("No ducks found with the specified criteria.");
        }
        res.json(ducks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error searching for ducks');
    }
});
