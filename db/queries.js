const pool = require("./pool");


// Add user to db and return user id
async function addUser(first, last, user, pass) {
    await pool.query(`
        INSERT INTO users (firstname, lastname, username, password, ismember)
        VALUES
        ('${first}', '${last}', '${user}', '${pass}', false);`);
}

// Add message to db
async function addMessage(userId, title, message) {
    await pool.query(`
        INSERT INTO messages (userid, title, message, createtime)
        VALUES
        (${userId}, '${title}', '${message}', CURRENT_TIMESTAMP)`);
}

// Get user by username
async function getUser(user) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE username = '${user}';`);
    return rows[0];
}

// Get user by id
async function getUserById(id) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id};`);
    return rows[0];
}

// Get all messages
async function getMessages() {
    const { rows } = await pool.query(`SELECT users.username, messages.title, messages.message, messages.createtime
         FROM messages JOIN users ON messages.userid = users.id;`);
    return rows;
}

// Update user membership
async function updateMembership(user, isMember) {
    await pool.query(`
        UPDATE users
        SET ismember = ${isMember}
        WHERE username = '${user}';`);
}



module.exports = {
    addUser,
    addMessage,
    getUser,
    getUserById,
    getMessages,
    updateMembership,
};