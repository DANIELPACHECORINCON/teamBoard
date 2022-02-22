import mongoose from "mongoose";

// estructura de la coleccion en mongo
const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "users" },
  name: String,
  description: String,
  imageUrl: String,
  taskStatus: String,
  registerDate: { type: Date, default: Date.now },
});

// esta variable agrega el schema a la coleccion y si la collecion no existe la crea
const task = mongoose.model("tasks", taskSchema);
export default task;         // aca expoprtamos el modulo
