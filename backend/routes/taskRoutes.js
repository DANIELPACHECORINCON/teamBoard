import express from "express";
import taskController from "../controllers/taskController.js";
import taskValidate from "../middleware/taskValidate.js";

const router = express.Router();

router.post(
  "/registerTask",
  taskValidate.existingTask,
  taskController.registerTask
);
router.get("/listTask/:name?", taskController.listTask);
router.delete("/deleteTask/:_id", taskController.deleteTask);
router.put("/updateTask", taskController.updateTask);

export default router;
