
var path = require("path");

/// Khai bao su dung Library 
// *** chu y, cai dat Library:  npm install --save express
const express = require('express');
const app = express();



const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

hbs   = require( 'express-handlebars' );
//view engine setup 
app.engine( 'hbs', hbs( { 
    extname: 'hbs', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    hbs: allowInsecurePrototypeAccess(Handlebars),
  } ) );
app.set('view engine', 'hbs');

app.set("views", path.join(__dirname, "views")); //setting views directory for views. 


/* */

/// PUBLIC FILEs
app.use(express.static('public'))
// gan them json
app.use(express.json());
app.use(express.urlencoded());

bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


/// Khai bao cac Config, Params
const hostname = "localhost";
const port = process.env.PORT || 3000;

// ket noi mongoose
//const url =  "mongodb+srv://newUser01:wdXnHi7GftQ8erhZ@cluster0.s7ukh.mongodb.net/ATNWeb211015?retryWrites=true&w=majority"
const url = "mongodb+srv://project2:project2@cluster0.t0ieq.mongodb.net/Newdemo?retryWrites=true&w=majority"

const mongoose = require("mongoose");
mongoose.connect(
    url, 
    {   useNewUrlParser: true , useUnifiedTopology: true }
);



/// Khai bao Variables
var solan = 0;

/// REQ chung 
app.use(
    (req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type","text/html");
        console.log("--- ", Date.now(), " \t request !!!", solan++ , req.url);
        next();
    }
);

/// Error-Handling
app.use(
    (err, req, res, next) => {
        res.statusCode = 500;
        console.log("--- ERR", Date.now(), " \t request !!!", solan++ , req.url, err);
        res.end("Broking !!!");
    }
);


/// Khai Bao CODE Xu Ly cho URL dua vao Express - Router




/// gan root URL vao Router
const homeRouter = require("./routes/homeRoutes");
app.use("/", homeRouter);


// Add them LIB Routing (Controller)
const foodRouter = require("./routes/foodRoutes");
app.use("/food", foodRouter);

const productRouter = require("./routes/productRoutes");
app.use("/product", productRouter);

const orderRouter = require("./routes/orderRoutes");
app.use("/order", orderRouter);

const accountRouter = require("./routes/accountRoutes");
app.use("/account", accountRouter);


// MVC - Model (DB) - View (UI) - Controller (Code - processing / Route)

/// Open Server - Listen PORT
app.listen( port, () => {
    console.log("Start SERVER - LISTEN ", port);
});


