const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "database-1.c7c8606w4iug.us-east-2.rds.amazonaws.com", 
  user: "admin",  
  password: "11235813", 
  database: "test_db", 
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('MySQL connected...');
});

module.exports = db;