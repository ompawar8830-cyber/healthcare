const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function fix() {
    try {
        const envPath = path.join(__dirname, '.env');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const mongoUriMatch = envContent.match(/MONGO_URI=(.*)/);
        const mongoUri = mongoUriMatch ? mongoUriMatch[1].trim() : null;

        await mongoose.connect(mongoUri);
        const User = mongoose.model('UserFix', new mongoose.Schema({}, { strict: false }), 'users');

        // Force set admin for the number requested by user
        const target = "9529344889";
        const result = await User.findOneAndUpdate(
            { phone: target },
            { role: 'admin' },
            { new: true }
        );

        if (result) {
            console.log(`✅ SUCCESS: Phone ${target} is now ADMIN.`);
        } else {
            console.log(`❌ ERROR: Phone ${target} not found in DB.`);
            // Try to create it if it doesn't exist
            await User.create({
                phone: target,
                password: "2212",
                role: "admin",
                name: "System Administrator"
            });
            console.log(`✅ SUCCESS: Created new ADMIN account for ${target}.`);
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fix();
