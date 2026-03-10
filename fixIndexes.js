require('dotenv').config();
const mongoose = require('mongoose');
const Disease = require('./models/Disease');

async function fixIndexes() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Fixing indexes...");
        await Disease.syncIndexes();
        console.log("✅ Indexes synchronized.");
    } catch (err) {
        console.error("❌ Error syncing indexes:", err.message);
    } finally {
        mongoose.connection.close();
    }
}
fixIndexes();
