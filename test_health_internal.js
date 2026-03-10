const axios = require('axios');

async function testHealth() {
    console.log("🚀 Starting Health System Verification...");

    // Note: This script assumes the server is running on PORT 5000
    // And requires a valid login token. For simulation, we'll check the routes.

    const BASE_URL = 'http://localhost:5000/api/health';

    try {
        console.log("Checking Health Content (Offline)...");
        const content = await axios.get(`${BASE_URL}/content`);
        console.log("✅ Health Content Loaded Successfully:", Object.keys(content.data));

        console.log("\nVerification Complete. Manual verification recommended for Dashboard UI.");
    } catch (e) {
        console.log("❌ Verification Error: Server might not be running or route is unreachable.");
    }
}

testHealth();
