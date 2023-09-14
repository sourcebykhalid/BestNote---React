/* eslint-disable no-undef */
const express = require("express");
// const { model } = require("mongoose");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
// Route 1: get all the Notes using: GET "/api/notes/getuser". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Route 2: Add a new Note using: POST "api/notes/addnote" Login required
router.post(
  "/addnote",
  fetchuser,
  [
    // Middleware for input validation using express-validator
    body("title", "Please enter a valid title").isLength({ min: 3 }), // Check name length
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }), // Check password length
  ],

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors if present
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      // note.save();
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // Create a newNote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // Find the note to update
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Unauthorized");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});
// Route 3: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to delete
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal SErver Error");
  }
});
module.exports = router;
