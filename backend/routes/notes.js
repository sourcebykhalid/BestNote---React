/* eslint-disable no-undef */
const express = require("express");
// const { model } = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
  ob = {
    message: "Welcome to the API",
    status: "okay",
    message2: "Welcome to the API2",
    status2: "pending",
  };
  res.json(ob);
});

module.exports = router;
