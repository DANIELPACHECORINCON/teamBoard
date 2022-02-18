import mongoose from "mongoose";

// estructura de la coleccion en mongo
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: mongoose.Schema.ObjectId, ref: "roles" },
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});
// esta variable agrega el schema a la coleccion y si la collecion no existe la crea
const user = mongoose.model("users", userSchema);
export default user; // aca expoprtamos el modulo
