const dns = require('dns');
const srvRecord = '_mongodb._tcp.cluster0.mqssgge.mongodb.net';
const txtRecord = 'cluster0.mqssgge.mongodb.net';

dns.resolveSrv(srvRecord, (err, srvs) => {
    if (err) console.error('SRV Error:', err);
    else console.log('SRV Records:', JSON.stringify(srvs, null, 2));

    dns.resolveTxt(txtRecord, (err, txts) => {
        if (err) console.error('TXT Error:', err);
        else console.log('TXT Records:', JSON.stringify(txts, null, 2));
    });
});
