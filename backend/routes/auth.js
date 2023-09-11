/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Import required modules and libraries
const express = require("express");
const User = require("../models/User"); // Importing the User model from another file
const router = express.Router();
const { body, validationResult } = require("express-validator"); // Using express-validator for input validation
const bcrypt = require("bcryptjs"); // Library for hashing passwords securely
const jwt = require("jsonwebtoken"); // Library for generating JSON Web Tokens

// Secret key used to sign JWT tokens
const JWT_SECRET = "This password is protected";

// Define a POST route for user registration
router.post(
  "/createuser",
  [
    // Middleware for input validation using express-validator
    body("name", "Please enter a valid name").isLength({ min: 5 }), // Check name length
    body("email", "Please enter a valid email").isEmail(), // Check email format
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }), // Check password length
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors if present
    }

    try {
      // Check if a user with the provided email already exists in the database
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exists" }); // Return an error if the email is already registered
      }

      // Generate a salt for password hashing
      const salt = await bcrypt.genSalt(10);

      // Hash the user's password securely using bcrypt
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new User document in the database
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // Generate a JSON Web Token (JWT) containing the user's ID and sign it with a secret key
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      console.log(jwtData);

      // Return the newly created user data and the JWT as a response
      res.json(user);
    } catch (error) {
      res.status(409).send("Error creating account"); // Return an error if any exception occurs during the registration process
    }
  }
);

module.exports = router; // Export the router for use in other parts of the application
