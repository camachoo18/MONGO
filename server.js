require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));  

const port = process.env.PORT || 3003;

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

const Juego = mongoose.model('Juego', juegoSchema);

// Rutas de la API (GET, POST, PUT, DELETE)
app.get("/juegos", async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.status(200).json(juegos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/juegos", async (req, res) => {
  const { titulo, Desarrolladora, "Fecha-Lanzamiento": fechaLanzamiento, Plataformas } = req.body;

  try {
    const nuevoJuego = new Juego({ titulo, Desarrolladora, "Fecha-Lanzamiento": fechaLanzamiento, Plataformas });
    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/juegos/:titulo", async (req, res) => {
  const { titulo } = req.params;
  const { Desarrolladora, "Fecha-Lanzamiento": fechaLanzamiento, Plataformas } = req.body;

  try {
    const juegoActualizado = await Juego.findOneAndUpdate(
      { titulo },
      { Desarrolladora, "Fecha-Lanzamiento": fechaLanzamiento, Plataformas },
      { new: true }
    );

    if (!juegoActualizado) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    res.status(200).json(juegoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/juegos/:titulo", async (req, res) => {
  const { titulo } = req.params;

  try {
    const juegoEliminado = await Juego.findOneAndDelete({ titulo });

    if (!juegoEliminado) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    res.status(204).json({ message: "Juego eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor lanzado en http://localhost:${port}`);
});
