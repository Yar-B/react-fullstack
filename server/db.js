const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	password: '9016',
	host: 'postgresdb',
	database: 'simple_db'
})

module.exports = pool

