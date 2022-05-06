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

// Trae los pagos
app.get("/api/pagos", (req, res) => {
  conexion.query("SELECT * FROM Pagos", (error, filas) => {
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
  let date = new Date();
  var hora =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  var fechaYHora = date.toISOString().split("T")[0] + " " + hora;
  let payload = {
    nombre: req.query.nombre,
    telefono: req.query.telefono,
    ultimo_pago: req.query.ultimo_pago,
    fecha_creacion: fechaYHora,
  };
  let sql = "INSERT INTO Clientes SET ?";
  conexion.query(sql, payload, function (error, result) {
    if (error) {
      throw error;
    } else {
      res.send(result);
    }
  });
});

//Añade pago
app.post("/api/Pagos", (req, res) => {
  let date = new Date();
  var hora =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  var fechaYHora = date.toISOString().split("T")[0] + " " + hora;
  let payload = {
    Monto: req.query.monto,
    Fecha_De_Pago: fechaYHora,
  };
  let sql = "INSERT INTO Pagos SET ?";
  conexion.query(sql, payload, function (error, result) {
    if (error) {
      throw error;
    } else {
      res.send(result);
    }
  });
});

// Editar cliente
app.put("/api/clientes/:id", (req, res) => {
  let date = new Date();
  var hora =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  var fechaYHora = date.toISOString().split("T")[0] + " " + hora;
  let id = req.params.id;
  let nombre = req.body.nombre;
  let telefono = req.body.telefono;
  let ultimo_pago = req.body.ultimo_pago;
  let fecha_creacion = fechaYHora;
  let sql =
    "UPDATE Clientes SET nombre = ?, telefono = ?, ultimo_pago = ?, fecha_creacion = ? WHERE id = ?";
  conexion.query(
    sql,
    [nombre, telefono, ultimo_pago, fecha_creacion, id],
    function (error, result) {
      if (error) {
        throw error;
      } else {
        res.send(result);
      }
    }
  );
});

const puerto = "4000";

app.listen(puerto, function () {
  console.log("Servidor " + puerto + " en linea");
});
