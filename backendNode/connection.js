
// connecting pgSQL
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// pooling db
const pool = new Pool({
   connectionString: process.env.DATABASE_URL
 });

module.exports = pool;


