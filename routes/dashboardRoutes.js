const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Import the required models and middleware
const Signup = require("../models/Signup");  // Import the Signup model
const sales = require("../models/sales");
const produce = require("../models/produce");
const Credit = require("../models/credit");  // Import the Credit model

// Render the dashboard page
router.get("/dashboard", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const user = await Signup.findOne({ role: 'manager' }); 
    // Calculate total stock (kg)
    const totalStock = await produce.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$tonnage" } } }
    ]);

    // Calculate total sales (UGX)
    const totalSales = await sales.aggregate([
      { $group: { _id: null, totalSalesAmount: { $sum: "$amountpaid" } } }
    ]);

    // Calculate total credit sales (UGX)
    const totalCreditSales = await Credit.aggregate([
      { $group: { _id: null, totalCreditSales: { $sum: "$amountdue" } } }
    ]);

    // Render the dashboard view, passing the aggregated data
    res.render('dashboard', {
      totalStock: totalStock.length ? totalStock[0].totalStock : 0,
      totalSales: totalSales.length ? totalSales[0].totalSalesAmount : 0,
      totalCreditSales: totalCreditSales.length ? totalCreditSales[0].totalCreditSalesAmount : 0
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
