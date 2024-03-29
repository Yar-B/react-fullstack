const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	password: '9016',
	host: 'localhost',
	port: 5432,
	database: 'simple_db'
})

module.exports = pool

