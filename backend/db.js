require('dotenv').config();
const { Pool } = require('pg');

// Verify the database server's TLS certificate (prevents MITM on the DB connection).
// If your managed provider uses a private CA, supply its PEM via DATABASE_CA_CERT
// instead of turning verification off.
const ssl = process.env.DATABASE_CA_CERT
    ? { rejectUnauthorized: true, ca: process.env.DATABASE_CA_CERT }
    : { rejectUnauthorized: true };

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl
});

module.exports = pool;
