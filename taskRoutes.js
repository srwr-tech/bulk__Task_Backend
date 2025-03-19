const express = require("express");
const { saveTasks, getTasks,editTasks,deleteTask,completeTask,addTask } = require("./taskController");

const router = express.Router();

router.post("/import", saveTasks);
router.get("/taskers/:id", getTasks);
router.put("/tasks/:id", editTasks);
// router.put("/tasks/:id", editTasks);
router.delete("/tasks/:id", deleteTask);
router.put("/taskss/:id", completeTask);
router.post("/tasks", addTask);


module.exports = router;
