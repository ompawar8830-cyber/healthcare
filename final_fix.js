const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function fix() {
    try {
        // Force IPv4 to bypass Windows DNS/IPv6 issues
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const target = "9529344889";
        const result = await User.findOneAndUpdate(
            { phone: target },
            { role: 'admin' },
            { new: true }
        );

        if (result) {
            console.log(`✅ SUCCESS: ${target} is now ADMIN. Result role: ${result.role}`);
        } else {
            console.log(`❌ NOT FOUND: Creating ADMIN for ${target}.`);
            await User.create({
                phone: target,
                password: "2212",
                role: 'admin',
                name: "Super Admin"
            });
            console.log(`✅ CREATED ADMIN.`);
        }
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err.message);
        process.exit(1);
    }
}

fix();
