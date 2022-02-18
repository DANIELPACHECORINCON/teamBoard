import express from "express";
import roleController from "../controllers/roleController.js";

// traemos la funcion de router de express para administrar las rutas o apis
const router = express.Router();

// http://localhost:3001/api/role/registerRole aca asignamos la ruta de la api y le decimos que vaya al controlador
router.post("/registerRole", roleController.registerRole);
router.get("/listRole", roleController.listRole);

export default router;
