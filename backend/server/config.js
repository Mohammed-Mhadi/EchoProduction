const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'echomedia',
  password: 'password',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;



// const { Pool } = require('pg');


// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'Stream',
//   password: 'password',
//   port: 5432, // default PostgreSQL port
// });

// module.exports = pool;

