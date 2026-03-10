const mongoose = require('mongoose');
const uri = "mongodb+srv://ompawar8830_db_user:om22@cluster0.mqssgge.mongodb.net/?appName=Cluster0";

async function testRemote() {
    try {
        console.log("Attempting to connect to remote MongoDB...");
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ Remote MongoDB Connection SUCCESSFUL!");
    } catch (err) {
        console.error("❌ Remote MongoDB Connection FAILED:", err.message);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}
testRemote();
