const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'echomedia',
  password: 'password',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;



// const { Pool } = require('pg');
// require('dotenv').config();


// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'Stream',
//   password: 'password',
//   port: 5432, // default PostgreSQL port
// });

// module.exports = pool;

