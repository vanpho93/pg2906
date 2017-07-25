const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const Product = require('./Product');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    Product.getAllProduct((err, products) => {
        if (err) return res.send('LOI');
        res.render('home', { mang: products });
    });
});

app.get('/add', (req, res) => res.render('add'));

app.post('/add', parser, (req, res) => {
    const { name, description, price, image, video } = req.body;
    const product = new Product(name, description, image, video, price);
    product.insert(err => {
        if (err) return res.send('Loi');
        res.redirect('/');
    });
});

app.get('/update/:id', (req, res) => {
    const { id } = req.params;
    Product.getProductById(id, (err, product) => {
        if (err) return res.send('Loi');
        res.render('update', { product });
    });
});

app.get('/remove/:id', (req, res) => {
    const { id } = req.params;
    Product.removeProductById(id, err => {
        if (err) return res.send('Loi');
        res.redirect('/');
    });
});

app.post('/update/:id', parser, (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, video } = req.body;
    const product = new Product(name, description, image, video, price, id);
    product.update(err => {
        if (err) return res.send('Loi');
        res.redirect('/');
    });
});

app.listen(3000, () => console.log('Server started!'));
