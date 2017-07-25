const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'NODE2906',
    password: 'khoapham',
    max: 5,
    idleTimeoutMillis: 1000,
    user: 'postgres'
});

function queryDB(sql, arrayData, cb) {
    pool.connect((err, client, done) => {
        if (err) return cb(err, null);
        client.query(sql, arrayData, (errQuery, result) => {
            done();
            if (errQuery) return cb(errQuery, null);
            cb(null, result);
        });
    });
}

module.exports = queryDB;

// updateProduct(12, 'Khoa Pham', 'aaa', 1000, 'ccc', '123123', err => console.log(err));