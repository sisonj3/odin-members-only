const pool = require("./pool");


// Add user to db and return user id
async function addUser(first, last, user, pass) {
    await pool.query(`
        INSERT INTO users (firstname, lastname, username, password, ismember)
        VALUES
        ('${first}', '${last}', '${user}', '${pass}', false);`);
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

// Update user membership
async function updateMembership(user, isMember) {
    await pool.query(`
        UPDATE users
        SET ismember = ${isMember}
        WHERE username = '${user}';`);
}

// Check user membership
async function checkMembership(user) {

}

// Check return row with specific username

module.exports = {
    addUser,
    getUser,
    getUserById,
    updateMembership,
    checkMembership
};