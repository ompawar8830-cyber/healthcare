require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ phone: "9075429961" });
        if (user) {
            console.log("Found User Role:", user.role);
            console.log("User Name:", user.name);
        } else {
            console.log("User 9529344889 NOT FOUND");
        }
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}
checkUser();
