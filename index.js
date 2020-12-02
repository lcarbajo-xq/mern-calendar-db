const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./db/config");

//CREAR EL SERVIDOR EXPRESS

const app = express();

// Conexion a la DB

dbConnection();

//CORS

app.use(cors());

//DIRECTIO PÚBLICO

app.use(express.static("public"));

//Lectura y parseo del body

app.use(express.json());

//Rutas

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
//ESCUCHAR PETICIONES

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
