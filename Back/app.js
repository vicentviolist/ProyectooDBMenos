var express = require("express");
var mysql = require("mysql2");

var app = express();

var conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "DBMenosTest",
  password: "12345678",
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conexion exitosa");
  }
});

app.get("/", function (req, res) {
  res.send("SERVIDOR ONLINE :) !!!");
});

const puerto = "4000";

app.listen(puerto, function () {
  console.log("Servidor " + puerto + " en linea");
});
