const mysql = require('mysql2')

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  });

  con.connect(function(err) {
    if (err) console.log(err);
    console.log("Connection established")
})
exports.con = con
  