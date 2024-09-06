const pool = require("./pool");

async function addUser(first, last, user, pass) {
    await pool.query(`
        INSERT INTO users (firstname, lastname, username, password, ismember)
        VALUES
        ('${first}', '${last}', '${user}', '${pass}', false);`);
}

module.exports = {
    addUser,
};