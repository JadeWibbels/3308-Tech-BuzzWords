

var assert = require('assert');

var mysql = require('mysql')
var config = require('../CinderConfig')
var connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
});

describe('Access to DB', function () {
   describe('#pass', function () {
       it('Tests the cinder config values', function (done) {
           connection.connect();
           done();
           //connection.connect(done);
        });
    })
});

describe('Finds user in database', function () {
    describe('#pass', function () {
        it('Tests the mysql log in query', function (done) {
            var ID = 'erin.wibbels@colorado.edu';
            var pswd = '3308rocks';

            connection.query("SELECT * FROM students WHERE userID = ? AND password = ?", [ID, pswd], function (err, result, fields) {
                if (err) throw err
            })
            done();
            //connection.connect(done)
        });
    })
});

describe('Finds user in database', function () {
    describe('#fail', function () {
        it('Tests the mysql log in query - should fail no user exists', function () {
            var ID = 'harry.potter@colorado.edu';
            var pswd = '3308booooo';
            assert.equal(connection.query("SELECT * FROM students WHERE userID = ? AND password = ?", [ID, pswd], function (err, result, fields) {
                if (err) return 0;
            }), 1, "No user found");
            //done();
            //connection.connect(done)
        });
    })
});

describe('Finds group in database', function () {
    describe('#pass', function () {
        it('Tests the mysql group search query', function (done) {
            var CID = '3308';
            query = connection.query("SELECT number, days, time, location FROM groups WHERE classId = ?;", [CID], function (err, rows) {
                if (err) throw err;
            })
            done();
        });
    })
});

describe('Finds group in database', function () {
    describe('#fail', function () {
        it('Tests the mysql group search query - expects to fail group num is invalid', function (done) {
            var CID = '7200';
            assert.equal(query = connection.query("SELECT number, days, time, location FROM groups WHERE classId = ?;", [CID], function (err, rows) {
                if (err) return 1;
            }), 0, "Group not found");
            //done();
        });
    })
});
