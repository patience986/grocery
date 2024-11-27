const express = require("express");
const router = express.Router();

const sales = require("../models/sales");
const produce = require("../models/produce");
const connectEnsureLogin = require('connect-ensure-login');

// Render form for creating a new sale
router.get("/sales", (req, res) => {
  res.render("sales", { title: "Sell New Produce" });

});

router.get("/saleslist", async (req, res) => {
  try {
    const salesItems = await sales.find().sort({ $natural: -1 });
    res.render("saleslist", {
      title: "Sales List",
      sales: salesItems,
    });
  } catch (error) {
    console.error("Error fetching sales list:", error);
    res.status(404).send("Unable to find sales in the database.");
  }
});


// Handle form submission and create a sale
router.post("/sales", async (req, res) => {
  try {
    const { producename, tonnage } = req.body;

    // Validate input
    if (!producename || !tonnage) {
      return res.status(400).send("Please provide both produce name and tonnage.");
    }

    // Find the produce item
    const produceItem = await produce.findOne({ producename });

    if (!produceItem) {
      return res.status(404).send("Produce not found.");
    }

    // Check stock availability
    if (produceItem.tonnage < tonnage) {
      return res.status(400).send("Not enough stock available.");
    }

    // Update stock
    produceItem.tonnage -= tonnage;
    await produceItem.save();

    // Create a new sales entry
    const newSales = new sales(req.body);
    await newSales.save();

    // Redirect to the sales list page after the sale is created
    res.redirect("/saleslist");
  } catch (err) {
    console.error("Error handling sale:", err);
    res.status(500).send("Server error");
  }
});



// Render form to update a sale
router.get("/updatesale/:id", async (req, res) => {
  try {
    const sale = await sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).send("Sale not found.");
    }
    res.render("updatesale", {
      title: "Update Sale",
      sales: sale,
    });
  } catch (err) {
    console.error("Error fetching sale for update:", err);
    res.status(400).send("Unable to find the sale in the database.");
  }
});

// Handle form submission to update a sale
router.post("/updatesales", async (req, res) => {
  try {
    await sales.findByIdAndUpdate(req.query.id, req.body);
    res.redirect("/saleslist");
  } catch (err) {
    console.error("Error updating sale:", err);
    res.status(400).send("Unable to update the sale in the database.");
  }
});

// Render receipt for a specific sale
router.get("/receipt/:id", async (req, res) => {
  try {
    const sale = await sales.findById(req.params.id);

    if (!sale) {
      return res.status(404).send("Sale not found.");
    }

    res.render("receipt", { sale });
  } catch (err) {
    console.error("Error fetching receipt details:", err);
    res.status(500).send("Error fetching receipt details.");
  }
});

// Handle deletion of a sale
router.post("/deletesales", async (req, res) => {
  try {
    await sales.deleteOne({ _id: req.body.id });
    res.redirect("/saleslist");
  } catch (err) {
    console.error("Error deleting sale:", err);
    res.status(400).send("Unable to delete sale from the database.");
  }
});

router.get('/saleslist', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const salesData = await sales.find(); // Fetch sales data
    const userRole = req.user.role; // Get the role of the logged-in user

    res.render('saleslist', {
      sales: salesData,
      userRole: userRole
    });
  } catch (error) {
    console.error("Error fetching sales data:", error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
