const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'NODE2906',
    password: 'khoapham',
    max: 20,
    idleTimeoutMillis: 1000,
    user: 'postgres'
});

// pool.connect((err, client) => {
//     if (err) return console.log(err);
//     client.query('SELECT * FROM "Product"', (errQuery, result) => {
//         if (errQuery) return console.log(errQuery);
//         console.log(result.rows);
//     });
// });

function queryDB(sql, cb) {
    pool.connect((err, client) => {
        if (err) return cb(err, null);
        client.query(sql, (errQuery, result) => {
            if (errQuery) return cb(errQuery, null);
            cb(null, result);
        });
    });
}

// queryDB('SELECT * FROM "Product"', (err, result) => {
//     if (err) return console.log(err.toString());
//     console.log(result.rows);
// });

module.exports = queryDB;
