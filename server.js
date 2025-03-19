require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./taskRoutes");
const auth=require('./login/routes/authRoutes')
// const auth=require("./login/routes");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors(


  origin: "https://bulk-task.vercel.app/", // Allow frontend URL
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
));
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api", taskRoutes);
app.use("/auth", auth);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
