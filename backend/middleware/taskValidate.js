import taskModel from "../models/task.js";

const existingTask = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingName = await taskModel.findOne({ name: req.body.name });
  if (existingName)
    return res.status(400).send({ message: "The task is already registered" });

  next();
};

export default { existingTask };
