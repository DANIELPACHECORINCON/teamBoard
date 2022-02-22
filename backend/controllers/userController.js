import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
// funcion para regsitrar usuarios
const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  // encriptamos la contraseña para almacenarla en la base de datos
  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  let result = await userSchema.save();

  if (!result)
    return res.status(500).send({ message: "failed to register user" });
  // aca retornamos un json pero con los datos ecriptados usando la libreri jsonWebToken
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          roleID: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};
// funcion para listar los usuarios
const listUserAdmin = async (req, res) => {
  // con la expresion regular le decimos que si en el req viene un parametro que lo use para filtrar la busqueda
  // con el populate().exec() le decimos que nos traiga en un subjson la relacion que tien con la coleccion role
  let users = await userModel
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ users });
};

// funcion para listar los usuarios activos
const listUser = async (req, res) => {
  // con la expresion regular le decimos que si en el req viene un parametro que lo use para filtrar la busqueda
  // con el populate().exec() le decimos que nos traiga en un subjson la relacion que tien con la coleccion role
  let users = await userModel
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await userModel.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "wrong email or password" });

  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "wrong email or password" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);

  if (!passHash)
    return res.status(400).send({ message: "wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          roleID: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "login error" });
  }
};

// const deleteUser = async (req, res) => {
//   if (!req.params["_id"])
//     return res.status(400).send({ message: "Incomplete data" });

//   const users = await userModel.findByIdAndDelete(req.params["_id"]);

//   return !users
//     ? res.status(500).send({ message: "Error deleting user" })
//     : res.status(200).send({ message: "User deleted" });
// };

const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const users = await userModel.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !users
    ? res.status(500).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";

  if (!req.body.password) {
    const findUser = await userModel.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }

  const edituser = await userModel.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role,
  });

  if (!edituser) return res.status(500).send({message: "Error editing user"});
  return res.status(200).send({message: "user updated"});
};

export default {
  registerUser,
  listUser,
  login,
  deleteUser,
  listUserAdmin,
  updateUserAdmin,
};
