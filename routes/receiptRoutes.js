const express= require('express');
const router=express.Router();

//import {models} from 'mongoose';

// const form = require ('../models/form');

 router.get("/reciept", (req, res) => {
  res.render('receipt')});


    router.post("/receipt", (req, res) => {    // const newform = new form(req.body)
        newform.save()
    res.redirect('')
     });

   


    module.exports = router;