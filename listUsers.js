require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

async function listUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB!");
        const users = await User.find({});
        console.log("--- Registered Users ---");
        console.log(JSON.stringify(users, null, 2));
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}
listUsers();
