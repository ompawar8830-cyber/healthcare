const https = require('https');
const dotenv = require('dotenv');
dotenv.config();

const otp = "123456";
const phone = "919067924509"; // Added 91 prefix
const apiKey = process.env.SMS_API_KEY;

console.log("Using API Key:", apiKey ? apiKey.substring(0, 5) + "..." : "MISSING");

// Try Route: otp (Standard)
const url1 = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&variables_values=${otp}&route=otp&numbers=${phone}`;
// Try Route: q (Quick)
const url2 = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&message=Code ${otp}&route=q&numbers=${phone}`;

function testSMS(url, label) {
    console.log(`\nTesting ${label}...`);
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log(`\n${label} Response:`, data);
            try {
                const parsed = JSON.parse(data);
                if (parsed.request_id) {
                    console.log(`✅ Request ID: ${parsed.request_id}`);
                }
            } catch (e) { }
        });
    }).on('error', (e) => {
        console.error(`${label} Error:`, e.message);
    });
}

testSMS(url1, "OTP Route");
testSMS(url2, "Quick Route");
