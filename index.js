const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const { queryDB, insertProduct, getProductById } = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    queryDB('SELECT * FROM "Product"', [], (err, result) => {
        if (err) return res.send('LOI');
        res.render('home', { mang: result.rows });
    });
});

app.get('/add', (req, res) => res.render('add'));

app.post('/add', parser, (req, res) => {
    const { name, description, price, image, video } = req.body;
    insertProduct(name, description, price, image, video, err => {
        if (err) return res.send('CO LOI');
        res.send('Them thanh cong!');
    });
});

app.get('/update/:id', (req, res) => {
    const { id } = req.params;
    getProductById(id, (err, product) => {
        if (err) return res.send('Loi');
        res.render('update', { product });
    });
});

app.listen(3000, () => console.log('Server started!'));
