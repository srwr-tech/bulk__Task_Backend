const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, 
  taskName: { type: String, required: false },
  description: { type: String, required: false },
  dueDate: { type: String, required: false },
  priority: { type: String, required: false },
  completed:{type:String}
});

module.exports = mongoose.model("Task", taskSchema);
