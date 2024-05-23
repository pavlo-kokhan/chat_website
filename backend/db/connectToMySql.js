const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pvi_website",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL: " + err.stack);
        return;
    }
    console.log("Connected to MySQL");
});

module.exports = connection;