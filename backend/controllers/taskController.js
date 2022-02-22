import taskModel from "../models/task.js";

const registerTask = async (req, res) => {
  if (!req.body.description || !req.body.user)
    return res.status(400).send({ message: "Incomplete data" });

  const taskSchema = new taskModel({
    user: req.body.user,
    name: req.body.name,
    description: req.body.description,
    imageUrl: "imagen de la tarea",
    taskStatus: "to-do",
  });

  const result = await taskSchema.save();

  if (!result) return res.status(500).send({ message: "Error register task" });

  res.status(200).send({ result });
};

const listTask = async (req, res) => {
  let tasks = await taskModel
    .find({ name: new RegExp(req.params["name"]) })
    .populate("user")
    .exec();

  if (tasks.length === 0)
    return res.status(500).send({ message: "No search result" });

  return res.status(200).send({ tasks });
};

const deleteTask = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const tasks = await taskModel.findByIdAndDelete(req.params["_id"]);

  if (!tasks) return res.status(500).send({ message: "Error deleting task" });

  return res.status(200).send({ message: "Task deleted" });
};

const updateTask = async (req, res) => {
  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send({ message: "Incomplete data" });

  const editTask = await taskModel.findByIdAndUpdate(req.body._id, {
    taskStatus: req.body.taskStatus,
  });

  if (!editTask) return res.status(500).send({ messag: "Error updating Task" });

  return res.status(200).send({ message: "Task updated" });
};

export default { registerTask, listTask, deleteTask, updateTask };
