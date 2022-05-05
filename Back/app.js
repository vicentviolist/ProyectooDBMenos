var express = require("express");
var mysql = require("mysql2");
var cors = require("cors");

var app = express();
app.use(express.json());
app.use(cors());

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

// Trae todos los clientes
app.get("/api/clientes", (req, res) => {
  conexion.query("SELECT * FROM Clientes", (error, filas) => {
    if (error) {
      throw error;
    } else {
      res.send(filas);
    }
  });
});

// Trae usuario por id
app.get("/api/clientes/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM Clientes WHERE id = ?",
    [req.params.id],
    (error, fila) => {
      if (error) {
        throw error;
      } else {
        res.send(fila);
      }
    }
  );
});

// Crear un nuevoo cliente
app.post("/api/clientes", (req, res) => {
  let data = {
    id: req.body.id,
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    ultimo_pago: req.body.ultimo_pago,
    fecha_creacion: req.body.fecha_creacion,
  };
  let sql = "INSERT INTO Clientes SET ?";
  conexion.query(sql, data, function (error, result) {
    if (error) {
      throw error;
    } else {
      res.send(result);
    }
  });
});

const puerto = "4000";

app.listen(puerto, function () {
  console.log("Servidor " + puerto + " en linea");
});
