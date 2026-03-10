require("dotenv").config();
require("./config/db");
const User = require("./models/User");
const mongoose = require("mongoose");
const storage = require("./config/fallbackStorage");

const seedAdmin = async () => {
    // Wait for Mongoose to connect
    if (mongoose.connection.readyState !== 1) {
        await new Promise(resolve => {
            mongoose.connection.once('open', resolve);
            // Timeout after 3 seconds if DB is offline
            setTimeout(resolve, 3000);
        });
    }

    const adminData = {
        phone: "9529344889",
        name: "Super Admin",
        password: "2212", // User corrected password
        role: "admin"
    };

    try {
        if (mongoose.connection.readyState === 1) {
            let adminUser = await User.findOne({ phone: adminData.phone });
            if (adminUser) {
                adminUser.name = adminData.name;
                adminUser.role = adminData.role;
                adminUser.password = adminData.password;
                await adminUser.save();
                console.log("✅ Admin updated in MongoDB");
            } else {
                await User.create(adminData);
                console.log("✅ Admin created in MongoDB");
            }
        }

        // Also add/update in local storage
        const users = storage.getUsers();
        const existingIndex = users.findIndex(u => u.phone === adminData.phone);
        if (existingIndex !== -1) {
            users[existingIndex] = { ...users[existingIndex], ...adminData };
            // Save back to file
            storage.saveUser(users[existingIndex]);
        } else {
            storage.saveUser(adminData);
        }
        console.log("✅ Admin seeded/updated in Local Storage Fallback");

        process.exit(0);
    } catch (err) {
        console.error("Seed Error:", err);
        process.exit(1);
    }
};

seedAdmin();
