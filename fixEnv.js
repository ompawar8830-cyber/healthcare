const fs = require('fs');
const dns = require('dns');

dns.setServers(['8.8.8.8']);

const srvRecord = '_mongodb._tcp.cluster0.mqssgge.mongodb.net';
const txtRecord = 'cluster0.mqssgge.mongodb.net';

dns.resolveSrv(srvRecord, (err, srvs) => {
    if (err) return console.error('SRV Error:', err);

    dns.resolveTxt(txtRecord, (err, txts) => {
        if (err) return console.error('TXT Error:', err);

        const hosts = srvs.map(s => `${s.name}:${s.port}`).join(',');
        const options = txts[0].join('');

        const uri = `mongodb://ompawar8830_db_user:Omyaa%4022@${hosts}/?${options}&tls=true&appName=Cluster0`;

        let envVal = fs.readFileSync('.env', 'utf-8');
        envVal = envVal.replace(/MONGO_URI=.*/, `MONGO_URI=${uri}`);
        fs.writeFileSync('.env', envVal);
        console.log("✅ .env file updated with direct MongoDB URI!");
    });
});
