// Correctly importing express and using express.Router()
// import express from 'express';
// const express=require('express');
const express = require("express");

const  { signUp, signIn }=require('../controllers/authController.js')  // Ensure you're importing the named export correctly
 
// Create an instance of express Router
const router = express.Router();

// Define the route for signup
router.post('/signup', signUp);  // Use the named import directly here
 router.post('/signin', signIn);  // Use the named import directly here

// export default router;
module.exports = router;

