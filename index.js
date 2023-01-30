const express = require("express");

const app = express();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test_backend_nodejs",
  password: "root",
  dialect: "postgres",
  port: 5432,
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database!");
  });
});

app.get('/testdata', (req, res, next) => {
    console.log('TEST DATA: ');
    pool.query('SELECT * FROM test')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})


//CREATE SERVER

const server = app.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
})
