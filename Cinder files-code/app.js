/* Loading modules and setting JS variables*/

var express = require("express");
let app = express();
var path    = require("path");
var bodyParser = require('body-parser');
var http = require('http')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var html = require('html');
var nodemailer = require('nodemailer');
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

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

/*set directory for static files*/
app.use(express.static(__dirname + '/view/'));

/* Loads main page */
app.get('/',function(req, res, next){
  res.sendFile(path.join(__dirname+'/view/Front_Page2.html'));
  //__dirname : It will resolve to your project folder.
});

/*connect to mysql*/
con.connect(function (err) {
    if (err) throw err;
});

/* list class selection */

app.post('/viewClass/(:id)', urlencodedParser, function (req, res) {
    var CID = req.params.id;
    console.log(CID)
    query = con.query("SELECT number, days, time, location, info FROM Groups INNER JOIN classes ON Groups.classId = classes.classId WHERE Groups.classId = ?;", [CID], function (err, rows) {
        if (err) throw err;
        console.log(rows);
        //if (rows <= 0) res.render(path.join(__dirname + '/view/Group_Disp.html'), { data: all });
        res.render(path.join(__dirname + '/view/Group_Disp.ejs'), { data: rows });
    })
});

/* load calendar page*/

app.post('/viewCalendar', urlencodedParser, function (req, res) {
    console.log("loading Calendar")
    query = con.query("SELECT number, Groups.classId, days, time, location, info FROM Groups INNER JOIN classes ON Groups.classId = classes.classId;", function (err, rows) {
        if (err) throw err;
        console.log(rows);
        //if (rows <= 0) res.render(path.join(__dirname + '/view/Group_Disp.html'), { data: all });
        res.render(path.join(__dirname + '/view/Group_Disp.ejs'), { data: rows });
    });
});


/* Add Group page */

app.post('/addGroup', urlencodedParser, function (req, res, next) {
    var classID = req.body.classId;
    var dys = req.body.days;
    var tme = req.body.time;
    var loc = req.body.location;
    //console.log(ID, pswd); //test passed variables
    //var allClassesArray = [];
    con.query("INSERT into Groups (classId, days, time, location) values ( ?, ?, ?, ?);", [classID, dys, tme, loc], function (err, results) {
        if (err) throw err;
        console.log("group added successfully")
        res.sendFile(path.join(__dirname + '/view/Front_Page.html'));
    });
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

 	con.query("SELECT * FROM Students WHERE userID = ? AND password = ?",[ID,pswd], function (err, result, fields) {
          if (err) throw err; 
 		console.log(result);
    if (result.length != 0) {
      res.sendFile(path.join(__dirname+'/view/Front_Page.html'));
      //console.log("test");
      console.log(result);
    }
    else {
    res.sendFile(path.join(__dirname + '/view/Log_In_Failed.html'));
  }

  		});
});

/* forgot password */
app.post('/forgot', urlencodedParser, function (req, res, next) {
    var ID = req.body.userId;
    console.log(ID);

    //this tests connection
	/**con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	});**/

	/**this tests returns/ working code!
	con.connect(function(err) {
	if (err) throw err;**/

    con.query("SELECT password FROM Students WHERE userID = ?", [ID], function (err, result, fields) {
        if (err) throw err;

        var password = JSON.stringify(result);
        console.log("password is", password);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cinder.study@gmail.com',
                pass: '3308rocks'
            }
        });

        var mailOptions = {
            from: 'cinder.study@gmail.com',
            to: ID,
            subject: 'Your forgotten password',
            text: password
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        if (result.length != 0) {
            res.sendFile(path.join(__dirname + '/view/Log_In.html'));
            //console.log("test");
        }
        else {
            res.sendFile(path.join(__dirname + '/view/Log_In_Failed.html'));
        }

    });
});

/* add new user */
app.post('/add', urlencodedParser, function (req, res, next) {
    var ID = req.body.userId;
	var pswd = req.body.password;
	console.log(ID, pswd); //test passed variables
    
    con.query("SELECT * FROM Students WHERE userId= ? AND password = ?", [ID, pswd], function (err, result, fields) {
        con.query("INSERT into Students (userId, password) values ( ?, ?);", [ID, pswd], function (err, results) {
            if (err) res.sendFile(path.join(__dirname + '/view/New_User_Failed.html'));
            console.log("user added successfully")
            res.sendFile(path.join(__dirname + '/view/Front_Page.html'));
        })
    })
});

/* list class selection */



var hostName = config.server.host;
var serverPort = config.server.port;
app.listen(serverPort, function(){
 console.log('Server running at port ' + serverPort + ': http://' + hostName + ': '
+ serverPort)
})
