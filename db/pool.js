const { Pool } = require("pg");

// Should be read from environment variables
module.exports = new Pool({
    connectionString: "postgresql://nosis:rAgn4r0k@localhost:5432/memonly"
});