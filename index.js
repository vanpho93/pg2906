const express = require('express');
const queryDB = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    queryDB('SELECT * FROM "Product"', (err, result) => {
        if (err) return res.send('LOI');
        res.render('home');
    });
});

app.listen(3000, () => console.log('Server started!'));
