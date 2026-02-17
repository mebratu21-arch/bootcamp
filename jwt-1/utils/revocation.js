const fs = require('fs');
const path = require('path');

const revokedFile = path.join(__dirname, '../data/revoked_tokens.json');

if (!fs.existsSync(revokedFile)) {
    fs.writeFileSync(revokedFile, JSON.stringify([]));
}

const getRevokedTokens = () => {
    const data = fs.readFileSync(revokedFile);
    return JSON.parse(data);
};

const revokeToken = (token) => {
    const revoked = getRevokedTokens();
    revoked.push(token);
    fs.writeFileSync(revokedFile, JSON.stringify(revoked, null, 2));
};

const isTokenRevoked = (token) => {
    return getRevokedTokens().includes(token);
};

module.exports = { revokeToken, isTokenRevoked };
