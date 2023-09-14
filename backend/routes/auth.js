/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Import required modules and libraries
const express = require("express");
const User = require("../models/User"); // Importing the User model from another file
const router = express.Router();
const { body, validationResult } = require("express-validator"); // Using express-validator for input validation
const bcrypt = require("bcryptjs"); // Library for hashing passwords securely
const jwt = require("jsonwebtoken"); // Library for generating JSON Web Tokens
const fetchuser = require("../middleware/fetchuser");
// Secret key used to sign JWT tokens
const JWT_SECRET = "This password is protected";

// Define a POST route for user registration
// Route 1 Create te user
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
      const authhtoken = jwt.sign(data, JWT_SECRET);
      console.log(authhtoken);
      // Return the newly created user data and the JWT as a response
      res.json(authhtoken);
    } catch (error) {
      res.status(409).send("Error creating account"); // Return an error if any exception occurs during the registration process
    }
  }
);

// Authenticate a user using: POST "/api/auth/login". No login Required
// Route 2 Login Authentication
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(), // Check email format
    body("password", "Password cannott be empty").exists(), // Check password format
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors if present
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authhtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authhtoken });
    } catch (error) {
      res.status(409).send("internal error occured"); // Return an error if any exception occurs during the registration process
    }
  }
);

// Router 3: Get User details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router; // Export the router for use in other parts of the application
