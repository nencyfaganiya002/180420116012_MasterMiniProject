var express = require('express');
const path = require('path');
var engines = require('consolidate');
var bodyParser = require('body-parser');

var app = express();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'public')));

// SET OUR VIEWS AND VIEW ENGINE
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', function (req, res) {
   res.render('index');
});

app.get('/tictactoe', function (req, res) {
   res.render('tictactoe');
});

app.get('/game', function (req, res) {
   res.render('game');
});

app.use('/', (req,res) => {
   res.status(404).send('<h1>404 Page Not Found!</h1>');
});

app.listen(3000, () => console.log("Server is Running..."));