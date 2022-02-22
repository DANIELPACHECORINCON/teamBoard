import express from "express";
import userController from "../controllers/userController.js";
import userValidate from "../middleware/userValidate.js";
import roleValidate from "../middleware/roleValidate.js";

// traemos la funcion de router de express para administrar las rutas o apis
const router = express.Router();

// http://localhost:3001/api/user/registerUser aca asignamos la ruta de la api
// aca colocamos validaciones necesarias para registrar el usuario y estas se hacen por medio del middleware
router.post(
  "/registerUser",
  userValidate.existingUser,
  roleValidate.exixtinRole,
  userController.registerUser
);
// aca le decimo que en la url puede o no venir un parametro y que si viene que lo use en el listUser
router.get("/listUser/:name?", userController.listUser);
router.post("/login", userController.login);
router.put("/deleteUser/:_id", userController.deleteUser);
router.put("/updateUserAdmin", userController.updateUserAdmin);

export default router;
