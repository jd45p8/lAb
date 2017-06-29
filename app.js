var express = require('express');
var path = require('path');
var app = express();
var glob = require('glob');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var rootPath = path.normalize(__dirname + '/');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');


//Conection with database
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);

//, {useMongoClient: true}

//Get the default conection
var db = mongoose.connection;

//Bind conection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Express
app.use(morgan('dev'));
app.use(cookieParser());

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.set('view engine', 'pug');

app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

//Required for passport
app.use(session({
    secret: '>s=M3Gf":L%(Jt&+!Ver^LMptKV]!Jn)+e;R]=]y<}:/%bF,s(x8tj2nsec%S]F',
    resave: true,
    saveUninitialized: false
}))

/* Obtener los modelos */
var models = glob.sync(rootPath + '/models/*.js');
models.forEach(function(model){
    require(model);
});

//passport
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* Required for flash */
app.use(function(req, res, next){
    res.locals.messages = req.flash();
    res.locals.messages.exito = req.flash('exito');
    res.locals.messages.error = req.flash('error');
    next();
});

/* Controladores de rutas */
var controllers = glob.sync(rootPath + '/controlers/*.js');
controllers.forEach(function(controller){
   require(controller)(app, passport); 
});

/* Servidor */
app.listen(port, function(){
    console.log("App running on port " + port + " at 127.0.0.1!");
});

