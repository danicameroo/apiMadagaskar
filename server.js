const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productsRoute = require("./routes/products");
const cors = require("cors");

dotenv.config();

// Configuración de CORS para permitir acceso desde tu página web
app.use(cors({
  origin: 'https://danicameroo.github.io/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

// Middleware para el manejo de datos JSON
app.use(express.json());

// Rutas
app.use("/api/products", productsRoute);

// Iniciar el servidor
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
