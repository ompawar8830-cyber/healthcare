const http = require('http');

async function runTests() {
    console.log("Testing Login with Admin Credentials...");

    // 1. Test Login
    const loginData = JSON.stringify({ phone: '9529344889', password: '2212' });

    const loginReq = http.request({
        hostname: 'localhost',
        port: 5001,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(loginData)
        }
    }, res => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            console.log(`Login Status: ${res.statusCode}`);
            console.log(`Login Response: ${data}`);

            const cookies = res.headers['set-cookie'];
            if (!cookies) {
                console.error("No cookie returned!");
                return;
            }

            const tokenCookie = cookies[0].split(';')[0];
            console.log("Extracted Cookie:", tokenCookie);

            // 2. Test /api/auth/profile
            console.log("\nTesting Profile Update...");
            const profileData = JSON.stringify({
                name: "Om Pawar",
                age: 30,
                gender: "Male",
                bloodGroup: "O+",
                bio: "Healthcare Admin"
            });

            const profileReq = http.request({
                hostname: 'localhost',
                port: 5001,
                path: '/api/auth/profile',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(profileData),
                    'Cookie': tokenCookie
                }
            }, profileRes => {
                let pData = '';
                profileRes.on('data', d => pData += d);
                profileRes.on('end', () => {
                    console.log(`Profile Status: ${profileRes.statusCode}`);
                    console.log(`Profile Response: ${pData}`);

                    // 3. Test /api/auth/me to verify saved data
                    console.log("\nTesting /api/auth/me fetching profile...");
                    http.get({
                        hostname: 'localhost',
                        port: 5001,
                        path: '/api/auth/me',
                        headers: { 'Cookie': tokenCookie }
                    }, meRes => {
                        let meData = '';
                        meRes.on('data', d => meData += d);
                        meRes.on('end', () => {
                            console.log(`Me Status: ${meRes.statusCode}`);
                            console.log(`Me Response: ${meData}`);
                        });
                    });
                });
            });
            profileReq.write(profileData);
            profileReq.end();

        });
    });

    loginReq.on('error', e => console.error(e));
    loginReq.write(loginData);
    loginReq.end();
}

runTests();
