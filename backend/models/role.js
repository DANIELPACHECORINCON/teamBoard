import mongoose from "mongoose";

// estructura de la coleccion en mongo
const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

// esta variable agrega el schema a la coleccion y si la collecion no existe la crea
const role = mongoose.model("roles", roleSchema);
export default role; // aca expoprtamos el modulo
