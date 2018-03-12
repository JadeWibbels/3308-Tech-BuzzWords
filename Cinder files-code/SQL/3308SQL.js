// to connect In progress!

var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user : "root",
	password : "Morningst@r1"
	});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query('Insert into students (userId, password) values($1, $2);', 
	['tinyhound@gmail.com', 'Cheese'], function(err,result){
	 if (err) throw err;
	console.log("Welcome Tiny Hound");
});	
