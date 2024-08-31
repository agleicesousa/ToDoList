const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const getTasks = async () => {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows;
};

module.exports = {
    getTasks
}