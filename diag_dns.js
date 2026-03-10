const dns = require('dns');
dns.setServers(['8.8.8.8']);


const hosts = [
    'cluster0.fbbql7k.mongodb.net',
    'cluster0-shard-00-00.fbbql7k.mongodb.net',
    'google.com'
];

hosts.forEach(host => {
    dns.resolve(host, (err, addresses) => {
        if (err) {
            console.error(`❌ Failed to resolve ${host}: ${err.message}`);
        } else {
            console.log(`✅ Resolved ${host}: ${addresses.join(', ')}`);
        }
    });
});

dns.resolveSrv('_mongodb._tcp.cluster0.fbbql7k.mongodb.net', (err, addresses) => {
    if (err) {
        console.error(`❌ Failed to resolve SRV for cluster0: ${err.message}`);
    } else {
        console.log(`✅ Resolved SRV for cluster0: ${JSON.stringify(addresses)}`);
    }
});
