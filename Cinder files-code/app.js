/* Loading modules and setting JS variables*/

var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var app     = express();
var path    = require("path");
var bodyParser = require('body-parser');
var http = require('http')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var add = require('./routes/add')
var engines = require('consolidate');
var engines = require('consolidate');

/*configure express*/
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: 'supernova', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

/* Session-persisted message middleware*/
app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;
    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
});

/* Configure express to use handlebars templates */
var hbs = exphbs.create({
    defaultLayout: 'main', //we will be creating this layout shortly
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* Connecting to mySQL database */
var mysql = require('mysql')
var myConnection = require('express-myconnection')
var config = require('./CinderConfig')
var con = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
});

/* set views */
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

/*set directory for static files*/
app.use(express.static(__dirname + '/view/'));

/* Loads main page */
app.get('/',function(req, res, next){
  res.sendFile(path.join(__dirname+'/view/Log_In.html'));
  //__dirname : It will resolve to your project folder.
});

/*connect to mysql*/
con.connect(function (err) {
    if (err) throw err;
});

/* list class selection */

app.post('/addClass', urlencodedParser, function (req, res) {
    var ID = req.body.userId;
    var pswd = req.body.password;
    console.log(ID, pswd);
    /**
    con.query("UPDATE students SET class1 =?, class2=?, class3 =?, class4 =?, class5 =? WHERE userID = ? AND password = ?", [ID, pswd], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    
     
    var allClassesArray = []
    allClassesArray = con.query("SELECT classId FROM classes", function (err, rows) {
        if (err) throw err;
        console.log(rows);
    });**/
});

/* login capability */
app.post('/login', urlencodedParser,function(req, res, next){
	var ID = req.body.userId;
	var pswd = req.body.password;
	console.log(ID,pswd);
	
	//this tests connection
	/**con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	});**/

	/**this tests returns/ working code!
	con.connect(function(err) {
	if (err) throw err;**/
 	con.query("SELECT * FROM students WHERE userID = ? AND password = ?",[ID,pswd], function (err, result, fields) {
 		if (err) throw err;
 		console.log(result);
 		res.sendFile(path.join(__dirname+'/view/Front_Page.html'));
  		});
});

/* add new user */
app.post('/add', urlencodedParser, function(req, res, next){
	var ID = req.body.userId;
	var pswd = req.body.password;
	console.log(ID, pswd); //test passed variables
    var allClassesArray = [];
	con.query("SELECT * FROM studendts WHERE userId= ? AND password = ?", [ID, pswd], function(err, result, fields){
		if (err) con.query("INSERT into students (userId, password) values ( ?, ?);", [ID, pswd], function(err, results) {
			if (err) throw err;
            console.log("user added successfully")
            res.render(path.join(__dirname + '/view/front_page.html'), { ID:ID, pswd:pswd });
		})
		else {
			throw err;
		}
    });
});

/* list class selection */



var hostName = config.server.host;
var serverPort = config.server.port;
app.listen(serverPort, function(){
 console.log('Server running at port ' + serverPort + ': http://' + hostName + ': '
+ serverPort)
})
