const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, '../data'))) {
    fs.mkdirSync(path.join(__dirname, '../data'));
}

// Ensure users.json exists
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
}

const getUsers = () => {
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

module.exports = {
    findUserByUsername: (username) => getUsers().find(u => u.username === username),
    addUser: (user) => {
        const users = getUsers();
        users.push(user);
        saveUsers(users);
    },
    updateUser: (username, updates) => {
        const users = getUsers();
        const index = users.findIndex(u => u.username === username);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            saveUsers(users);
            return users[index];
        }
        return null;
    }
};
