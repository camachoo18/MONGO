require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 3000;


const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;


mongoose.connect(`mongodb://127.0.0.1:27017/Juegos`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conexión exitosa a MongoDB"))
.catch((err) => console.log("Error al conectar a MongoDB:", err));


const juegoSchema = new mongoose.Schema({
  titulo: String,
  Desarrolladora: String,
  "Fecha-Lanzamiento": String,
  Plataformas: Array
});


// const Juego = mongoose.model('Juego', juegoSchema);


app.get("/juegos/categoria/:categoria", async (req, res) => {
  const categoria = req.params.categoria; 
  
  try {
    
    const juegos = await mongoose.connection.collection(categoria).find().toArray();
    res.json(juegos);
  } catch (error) {
    res.status(500).send("Error al obtener los juegos de la categoría: " + error);
  }
});


app.get("/", async (req, res) => {
  try {
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json(collections);
  } catch (error) {
    res.status(500).send("Error al obtener las colecciones: " + error);
  }
});

app.listen(port, () => {
  console.log(`Servidor lanzado en http://localhost:${port}`);
});
