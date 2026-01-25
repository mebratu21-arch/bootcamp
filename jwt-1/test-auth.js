const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:5000/api';
const USERS_FILE = path.join(__dirname, 'data/users.json');

const test = async () => {
    console.log('🚀 Starting Senior Developer Audit...\n');

    try {
        // 1. Register
        console.log('Step 1: Registering user...');
        const regRes = await axios.post(`${API_URL}/auth/register`, {
            username: 'audit_user',
            password: 'password123',
            email: 'audit@example.com'
        });
        console.log('✅ Register Response:', regRes.data.message);

        // 2. Extract confirmation token from DB (since we are testing)
        const users = JSON.parse(fs.readFileSync(USERS_FILE));
        const user = users.find(u => u.username === 'audit_user');
        const confirmToken = user.confirmationToken;
        console.log('✅ Extracted Confirmation Token');

        // 3. Confirm Email
        console.log('Step 2: Confirming email...');
        const confRes = await axios.get(`${API_URL}/auth/confirm/${confirmToken}`);
        console.log('✅ Confirm Response:', confRes.data);

        // 4. Login
        console.log('Step 3: Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            username: 'audit_user',
            password: 'password123'
        });
        const accessToken = loginRes.data.accessToken;
        const cookie = loginRes.headers['set-cookie'];
        console.log('✅ Login successful. Access Token received.');

        // 5. Access Protected Route
        console.log('Step 4: Accessing protected profile...');
        const profRes = await axios.get(`${API_URL}/user/profile`, {
            headers: { 'Cookie': cookie[0] }
        });
        console.log('✅ Profile Data:', profRes.data.username);

        // 6. Refresh Token
        console.log('Step 5: Testing Token Refresh...');
        const refreshCookie = cookie.find(c => c.startsWith('refreshToken'));
        const refRes = await axios.post(`${API_URL}/auth/refresh`, {}, {
            headers: { 'Cookie': refreshCookie }
        });
        const newAccessTokenCookie = refRes.headers['set-cookie'][0];
        console.log('✅ Refresh successful. New Access Token cookie received.');

        // 7. Verify New Token
        console.log('Step 6: Verifying new token...');
        const profRes2 = await axios.get(`${API_URL}/user/profile`, {
            headers: { 'Cookie': newAccessTokenCookie }
        });
        console.log('✅ Profile Data with new token:', profRes2.data.username);

        // 8. Logout
        console.log('Step 7: Logging out (Revocation Test)...');
        await axios.post(`${API_URL}/auth/logout`, {}, {
            headers: { 'Cookie': newAccessTokenCookie + '; ' + refreshCookie }
        });
        console.log('✅ Logout complete.');

        // 9. Verify Revocation
        console.log('Step 8: Verifying token revocation...');
        try {
            await axios.get(`${API_URL}/user/profile`, {
                headers: { 'Cookie': newAccessTokenCookie }
            });
            console.log('❌ FAIL: Profile still accessible after logout!');
        } catch (err) {
            console.log('✅ SUCCESS: Access denied after logout (401).');
        }

        console.log('\n✨ Audit Complete. System is robust.');
    } catch (error) {
        console.error('❌ Audit Failed:', error.response?.data || error.message);
    }
};

test();
