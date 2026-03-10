require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testRegister() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB!");

        const phone = "1234567890";
        const password = "password123";

        console.log(`Attempting to register: ${phone}`);
        const user = new User({ phone, password });
        await user.save();
        console.log("✅ Registration successful!");

    } catch (err) {
        console.error("❌ Registration failed:", err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}
testRegister();
