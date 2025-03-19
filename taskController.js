const Task = require("./taskModel");

// @desc    Save tasks to the database
// @route   POST /api/tasks
const saveTasks = async (req, res) => {
  try {
    const tasks = await Task.insertMany(req.body.tasks);
    res.status(201).json({ message: "Tasks saved successfully", tasks });
  } catch (error) {
    console.error("Error saving tasks:", error);
    res.status(500).json({ error: "Error saving tasks" });
  }
};

// @desc    Get all tasks from the database
// @route   GET /api/tasks
const getTasks = async (req, res) => {
  try {
      console.log("Received request with params:", req.params); // Debugging

      const userId = req.params.id; // Get user ID from params
      if (!userId) {
          return res.status(400).json({ error: "User ID is required" });
      }

      console.log("Fetching tasks for user:", userId);

      // ✅ Filter tasks based on user ID
      const tasks = await Task.find({ userId: userId });

      console.log("Tasks retrieved:", tasks);
      res.json(tasks);
  } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Server error" });
  }
};


const editTasks = async (req, res) => {
  const taskId = req.params.id; // Get task ID from route params
  const updatedData = req.body; // Data to update

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updatedData },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  }  catch (err) {
    console.error("Error while updating task", err);
    res.status(500).json({ error: "Error while updating task" });
  }
};

const deleteTask = async (req, res) => {
  const deleteId = req.params.id; // Get task ID from URL parameters
  console.log(" heelo",deleteId)

  try {
    const deletedTask = await Task.findByIdAndDelete(deleteId); // Correct method to delete

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (err) {
    console.error("Error while deleting task", err);
    res.status(500).json({ error: "Error while deleting task" });
  }
};
const addTask = async (req, res) => {
  try {
    const { taskName, description, dueDate, priority, completed, userId } = req.body;

    // ✅ Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // ✅ Create new task
    const newTask = new Task({
      userId,
      taskName,
      description,
      dueDate,
      priority,
      completed: completed || false, // Default to false if not provided
    });

    await newTask.save();

    // ✅ Send response with success message
    res.status(201).json({ message: "Task added successfully", task: newTask });

  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Error adding task" });
  }
};

const completeTask = async (req, res) => {
  const taskId = req.params.id;
  console.log(" alam", taskId)
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true } // Return the updated task
    );
    console.log(updatedTask)
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task marked as completed", updatedTask });
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ error: "Error updating task status" });
  }
};



module.exports = { saveTasks, getTasks, editTasks,deleteTask,completeTask ,addTask};
