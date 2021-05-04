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
   res.render('login');
});

app.get('/tictactoe', function (req, res) {
   res.render('tictactoe');
});

app.get('/game', function (req, res) {
   res.render('game');
});

app.get('/puzz', function (req, res) {
   res.render('puzzle');
});




app.get('/process_request', function (req, res) {
   // Prepare output in JSON format
   response = {
      name:req.query.name,
      mobile:req.query.mobile,
      email:req.query.email,
      address:req.query.address,
      username:req.query.username,
      Epassword:req.query.Epassword
   };
   console.log(response);
   res.render('index');
      
   var mongodb = require('mongodb');
   var mongoClient = mongodb.MongoClient;
   var url = "mongodb://localhost:27017/";
   mongoClient.connect(url, function(err, databases) {
   if (err) {
       throw err;
   }

   var nodetestDB = databases.db("SignUpUserDetail"); //here  
   var customersCollection = nodetestDB.collection("FormDetail");
   var id=1;
   var customer = {name:req.query.name, Mobile:req.query.mobile, Email:req.query.email , Address:req.query.address, DOB:req.query.dob, Gender:req.query.gender, Unamer:req.query.username, Password:req.query.Epassword, ConfirmPassword:req.query.Cpassword };
   
   customersCollection.insertOne(customer, function(error, response) {
       if (error) {
           throw error;
       }
       id=id+1;
       console.log("1 document inserted");
       databases.close();
   });
});
});
app.use('/', (req,res) => {
   res.status(404).send('<h1>404 Page Not Found!</h1>');
});

app.listen(3000, () => console.log("Server is Running..."));