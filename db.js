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

// pool.connect((err, client) => {
//     if (err) return console.log(err);
//     client.query('SELECT * FROM "Product"', (errQuery, result) => {
//         if (errQuery) return console.log(errQuery);
//         console.log(result.rows);
//     });
// });

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

function insertProduct(name, description, price, image, video, cb) {
    const insertSQL = `INSERT INTO "Product"(name, description, price, image, video)
        VALUES ($1, $2, $3, $4, $5);`;
    queryDB(insertSQL, [name, description, price, image, video], (err, result) => {
        if(err) return cb(err, null);
        cb(null, result);
    });
}

function updateProduct(id, name, description, price, image, video, cb) {
    const updateSQL = `UPDATE public."Product"
	SET name=$1, description=$2, price=$3, image=$4, video=$5
    WHERE id = $6;`;
    queryDB(updateSQL, [name, description, price, image, video, id], cb);
}

module.exports = {
    queryDB, 
    insertProduct,
    updateProduct
};

// updateProduct(12, 'Khoa Pham', 'aaa', 1000, 'ccc', '123123', err => console.log(err));
