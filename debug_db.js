const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

// Force Google DNS
dns.setServers(['8.8.8.8']);

const uri = process.env.MONGO_URI;

async function debugConnection() {
    console.log("🔍 Starting Database Diagnostics...");
    console.log("-----------------------------------");
    console.log(`📡 URI in Use: ${uri.replace(/\/\/.*:.*@/, '//<credentials>@')}`);

    try {
        console.log("🧪 Step 1: Testing SRV Resolution...");
        // Correctly extract the host part (after @ and before /)
        const srvMatch = uri.match(/@([^/?]+)/) || uri.match(/\+srv:\/\/([^/?]+)/);
        if (srvMatch) {
            const host = srvMatch[1];
            console.log(`🔍 Resolving host: ${host}`);
            dns.resolveSrv(`_mongodb._tcp.${host}`, (err, addresses) => {
                if (err) {
                    console.error("❌ SRV Resolution FAILED:", err.message);
                } else {
                    console.log("✅ SRV Resolution SUCCESSFUL");
                }
            });
        }

        console.log("🧪 Step 2: Attempting Mongoose Connection...");
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000
        });

        console.log("✅ SUCCESS: Database connected successfully!");
        await mongoose.connection.close();
        process.exit(0);

    } catch (err) {
        console.log("\n❌ CONNECTION FAILED");
        console.log("-----------------------------------");

        if (err.message.includes("authentication failed") || err.message.includes("bad auth")) {
            console.error("🚩 DIAGNOSIS: Authentication Failed");
            console.log("💡 ACTION: Check your MONGO_URI in .env. The username or password seems incorrect.");
        } else if (err.message.includes("Could not connect to any servers") || err.message.includes("IP address") || err.message.includes("whitelist")) {
            console.error("🚩 DIAGNOSIS: IP Not Whitelisted");
            console.log("💡 ACTION: You must add your current IP address to MongoDB Atlas Network Access.");

            // Try to fetch public IP for convenience
            try {
                const https = require('https');
                https.get('https://api.ipify.org', (res) => {
                    res.on('data', (ip) => {
                        console.log(`👉 Your current Public IP: ${ip}`);
                    });
                });
            } catch (e) { }
        } else if (err.message.includes("querySrv E") || err.message.includes("ECONNREFUSED")) {
            console.error("🚩 DIAGNOSIS: DNS Resolution Issue");
            console.log("💡 ACTION: The DNS fix in config/db.js should handle this, but your network might be blocking DNS traffic.");
        } else {
            console.error("🚩 DIAGNOSIS: Unexpected Error");
            console.error(err.message);
        }

        process.exit(1);
    }
}

debugConnection();
