require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

async function fixRoles() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // 1. Set 9529344889 as Admin
        await User.findOneAndUpdate({ phone: "9529344889" }, { role: "admin" });
        console.log("✅ 9529344889 set to ADMIN");

        // 2. Revert 9075429961 to Doctor
        await User.findOneAndUpdate({ phone: "9075429961" }, { role: "doctor" });
        console.log("✅ 9075429961 reverted to DOCTOR");

    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}
fixRoles();
