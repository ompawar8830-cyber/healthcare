require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

async function forceAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOneAndUpdate(
            { phone: "9075429961" },
            { role: "admin" },
            { new: true }
        );
        if (user) {
            console.log("✅ SUCCESS: Role updated to ADMIN for", user.phone);
        } else {
            console.log("❌ ERROR: User not found");
        }
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}
forceAdmin();
