const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8']);


const hosts = "ac-0xkeust-shard-00-00.mqssgge.mongodb.net:27017,ac-0xkeust-shard-00-01.mqssgge.mongodb.net:27017,ac-0xkeust-shard-00-02.mqssgge.mongodb.net:27017";
const user = "ompawar";
const pwd = "pawar22";

async function testNewPwd() {
    const uri = `mongodb://${user}:${pwd}@${hosts}/healthcare?replicaSet=atlas-kx2ng3-shard-0&tls=true&authSource=admin`;

    try {
        console.log(`Testing password: ${pwd}`);
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ SUCCESS! Connection established to remote MongoDB.");
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error(`❌ FAILED: ${err.message}`);
        process.exit(1);
    }
}

testNewPwd();
