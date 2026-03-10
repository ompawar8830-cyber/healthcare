const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

// Force Google DNS
dns.setServers(['8.8.8.8']);

const srvUri = "mongodb+srv://ompawar:pawar22@cluster0.fbbql7k.mongodb.net/?appName=Cluster0";

async function testSrv() {
    try {
        console.log("🔗 Connecting with SRV...");
        await mongoose.connect(srvUri, {
            serverSelectionTimeoutMS: 10000
        });
        console.log("✅ SUCCESS: Connected to MongoDB via SRV!");
        await mongoose.connection.close();
    } catch (err) {
        console.error("❌ SRV Connection FAILED:", err.message);
    }
}

testSrv();
