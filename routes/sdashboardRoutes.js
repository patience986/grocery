const express= require('express');
const router=express.Router();
const connectEnsureLogin = require('connect-ensure-login');

const Signup = require("../models/Signup");  
const sales = require("../models/sales");
const produce = require("../models/produce");
const credit = require("../models/credit");  




 router.get("/sdashboard", (req, res) => {
  res.render('sdashboard', )});


    router.post("/sdashboard" ,connectEnsureLogin.ensureLoggedIn(), (req, res) => {    const newform = new form(req.body)
        newform.save()
    res.redirect('')
     });

     router.get("/sdashboard", async (req, res) => {
      try {
          // 1. Calculate total stock (kg)
          const totalStock = await produce.aggregate([
              { $group: { _id: null, totalStock: { $sum: "$tonnage" } } }
          ]);
  
          // 2. Calculate total credit sales (UGX)
          const creditSales = await credit.aggregate([
              { $group: { _id: null, totalCreditSales: { $sum: "$amountdue" } } }
          ]);
  
          // 3. Calculate total sales (UGX)
          const totalSales = await sales.aggregate([
              { $group: { _id: null, totalSales: { $sum: "$amountpaid" } } }
          ]);
  
          // 4. Render the dashboard view, passing the aggregated data
          res.render('sdashboard', {
              totalStock: totalStock.length ? totalStock[0].totalStock : 0,
              totalSales: totalSales.length ? totalSales[0].totalSales : 0,
              creditSales: creditSales.length ? creditSales[0].totalCreditSales : 0
          });
      } catch (err) {
          console.error('Error fetching dashboard data:', err);
          res.status(500).send('Server error');
      }
  });

     module.exports = router;