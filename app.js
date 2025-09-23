import express from "express";
import "dotenv/config";
import { connectDB } from "./src/config/database.js";
import { routes } from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT;

//Rutas
app.use(express.json());
app.use("/api", routes);

//Conexion a la base de datos
app.listen(PORT, async () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  await connectDB();
});
