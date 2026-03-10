require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);


async function testConnection() {
    try {
        console.log("Testing connection to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ Connected to MongoDB!");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
    } finally {
        mongoose.connection.close();
    }
}
testConnection();
