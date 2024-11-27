const express = require("express");
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');  // Import for login protection
const produce = require("../models/produce");
const sales = require("../models/sales");
const credit = require("../models/credit");
const Signup = require("../models/Signup");
//                                       const Signup = require("../models/signup");


// View specific produce stock items (Accessible to all users, no login required)
router.get('/viewstock', async (req, res) => {
  try {
    // Fetch all produce items from the database (or filter by specific produce types if needed)
    const produces = await produce.find(); // Fetch all produce

    // Render the stock view page and pass the produces data to the template
    res.render('viewstock', { produces });
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    res.status(500).send("Server error");
  }
});


// Render form for adding new produce
router.get("/produce", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("produce", { title: "Add New Produce" });
});

// Handle form submission to add new produce (Only for logged-in users)
router.post("/produce", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const user = await Signup.findOne({ role: 'manager' }); // Find manager (optional logic)
    console.log(req.body); // Log form data for debugging
    const newproduce = new produce(req.body); // Create new produce instance

    await newproduce.save(); // Save new produce to the database
    res.redirect("/producelist"); // Redirect to the produce list
  } catch (error) {
    console.error("Error saving produce to DB:", error.message);
    res.status(500).send("Unable to save produce to DB");
  }
});

// Display the list of all produce items
router.get("/producelist", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const produceItems = await produce.find().sort({ $natural: -1 }); // Fetch all produce items
    res.render("producelist", {
      title: "Produce List",
      produces: produceItems,
    });
  } catch (error) {
    console.error("Error fetching produce:", error.message);
    res.status(404).send("Unable to retrieve produce list from the database");
  }
});

// Route to render form for editing an existing produce item
router.get("/updateproduce/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const produceItem = await produce.findById(req.params.id); // Find produce by ID
    res.render("updateproduce", {
      title: "Update Produce",
      produce: produceItem, // Pass the specific produce item to the view
    });
  } catch (error) {
    console.error("Error fetching produce item:", error.message);
    res.status(500).send("Unable to fetch produce item");
  }
});

// Handle form submission for updating an existing produce item
router.post("/updateproduce/:id", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    await produce.findByIdAndUpdate(req.params.id, req.body); // Update produce item
    res.redirect("/producelist"); // Redirect to the produce list
  } catch (error) {
    console.error("Error updating produce:", error.message);
    res.status(500).send("Unable to update produce in the database");
  }
});

// Handle form submission to update tonnage of a produce item
router.post('/updateTonnage', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const { produceId, newTonnage } = req.body;  // Get produce ID and new tonnage

    if (!produceId || newTonnage === undefined) {
      return res.status(400).send('Produce ID and new tonnage are required');
    }

    // Update the tonnage of the specific produce item
    const result = await produce.findByIdAndUpdate(
      produceId,
      { tonnage: newTonnage },
      { new: true }  // Return the updated document
    );

    if (!result) {
      return res.status(404).send('Produce item not found');
    }

    res.json(result);  // Return the updated produce item
  } catch (error) {
    console.error('Error updating tonnage:', error.message);
    res.status(500).send('Server error');
  }
});

// Handle delete request for a produce item
router.post("/deleteproduce", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    await produce.deleteOne({ _id: req.body.id }); // Delete the specified produce item
    res.redirect("back");
  } catch (error) {
    console.error("Error deleting produce item:", error.message);
    res.status(500).send("Unable to delete produce item");
  }
});

// View specific produce stock items
router.get('/viewstock', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    // Fetch specific produce items from the database
    const produces = await produce.find({
      producename: { 
        $in: ['beans', 'grain maize', 'cowpeas', 'g-nuts', 'rice', 'soybeans']
      }
    });

    // Render the stock view page and pass the produces data to the template
    res.render('viewstock', { produces });
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    res.status(500).send("Server error");
  }
});

router.get("/sdashboard", async (req, res) => {
  try {
      // Calculate total stock
      const totalStock = await produce.aggregate([
          { $group: { _id: null, totalStock: { $sum: "$tonnage" } } }
      ]);
      
      // Calculate total sales (assuming this is stored in your sales model)
      const totalSales = await sales.aggregate([
          { $group: { _id: null, totalSales: { $sum: "$amount" } } }
      ]);
      
      // Calculate total credit sales (sum of all amounts due in the Credit model)
      const creditSales = await credit.aggregate([
          { $group: { _id: null, totalCreditSales: { $sum: "$amountdue" } } }
      ]);
      
      // Render the dashboard view, passing the data
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
