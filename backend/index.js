import express from "express";
import cors from "cors";
import db from "./db/db.js";
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from "dotenv";
dotenv.config(); //aca iniciamos el dotenv para que podamos reconocer las variables de entorno
// creamos la constante app y le asignamos el server express
const app = express();
app.use(express.json()); // lde decimos que solo acepte json
app.use(cors()); // cors lo usamos para controlar la seguridad de la aplicacion
// aca definimos las ritas hacia las aís de nuestra aplicacion
app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

// aca le decimos que el server va a funcionar por el puerto 3001
app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

db.dbconnection();
