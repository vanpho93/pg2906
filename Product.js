const queryDB = require('./db');

class Product {
    constructor(name, description, image, video, price, id) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.video = video;
        this.price = price;
        this.id = id;
    }

    static getAllProduct(cb) {
        queryDB('SELECT * FROM "Product"', [], (err, result) => {
            if (err) return cb(err);
            cb(null, result.rows);
        });
    } 

    static getProductById(id, cb) {
        const selectSQL = 'SELECT * FROM "Product" WHERE id = $1';
        queryDB(selectSQL, [id], (err, result) => {
            if (err) return cb(err, null);
            cb(null, result.rows[0]);
        });
    }

    static removeProductById(id, cb) {
        const removeSQL = 'DELETE FROM "Product" WHERE id = $1';
        queryDB(removeSQL, [id], cb);
    }

    insert(cb) {
        const insertSQL = `INSERT INTO "Product"(name, description, price, image, video)
        VALUES ($1, $2, $3, $4, $5);`;
        queryDB(insertSQL, [this.name, this.description, this.price, this.image, this.video], (err, result) => {
            if(err) return cb(err, null);
            cb(null, result);
        });
    }

    update(cb) {
        const updateSQL = `UPDATE public."Product"
        SET name=$1, description=$2, price=$3, image=$4, video=$5
        WHERE id = $6;`;
        queryDB(updateSQL, [this.name, this.description, this.price, this.image, this.video, this.id], cb);
    }
}

module.exports = Product;