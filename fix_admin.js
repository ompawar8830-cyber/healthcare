const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');

async function fix() {
    try {
        console.log('Connecting to:', process.env.MONGO_URI.split('@')[1]); // Log host only for safety
        await mongoose.connect(process.env.MONGO_URI);

        const target = "9529344889";
        const user = await User.findOne({ phone: target });

        if (user) {
            console.log(`Current Role for ${target}: ${user.role}`);
            if (user.role !== 'admin') {
                user.role = 'admin';
                await user.save();
                console.log(`✅ Role updated to ADMIN.`);
            } else {
                console.log(`✅ Already ADMIN.`);
            }
        } else {
            console.log(`❌ User ${target} NOT FOUND. Creating...`);
            await User.create({
                phone: target,
                password: "2212",
                role: "admin",
                name: "Admin"
            });
            console.log(`✅ Created ADMIN.`);
        }

        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err.message);
        process.exit(1);
    }
}

fix();
