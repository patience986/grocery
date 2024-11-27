const express = require("express");
const router = express.Router();

//import {models} from 'mongoose';

// const form = require ('../models/form');

router.get("/grocerystore", (req, res) => {
  res.render("grocerystore");
});

router.post("/grocerystore", (req, res) => {
  // const newform = new form(req.body)
  newform.save();
  res.redirect("/viewstock");
});

module.exports = router;
