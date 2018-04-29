var config = {
 database: {
 host: 'localhost', // database host
 user: 'root', // your database username
 password: 'Morningst@r1', // your database password
 port: 3306, // default MySQL port
 db: '3308grp1' // your database name
 },
 server: {
 host: '127.0.0.1',
 port: '3006'
 }

}
module.exports = config //Expose the current config as a module
