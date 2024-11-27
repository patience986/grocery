const express = require('express');
const router = express.Router();

// Require the Credit model
const credit = require('../models/credit')
const produce = require('../models/produce');
 

// Render the form for adding a new credit
router.get('/credit', (req, res) => {
    res.render('credit', { title: "Add New Credit" });
});




router.post('/credit', async (req, res) => {
    try {
        const { buyername ,nationalid ,location ,contact , amountdue ,salesagent, producttype ,duedate ,producename ,tonnage ,dispatchdate  } = req.body;

        // Validate input data
        if (!producename || !tonnage) {
            return res.status(400).send('Missing required fields: producename and tonnage');
        }

        // Find the produce item
        let produceItem = await produce.findOne({ producename });
        
        if (!produceItem) {
            return res.status(404).send('Produce not found');
        }
        
        // Check stock availability
        if (produceItem.tonnage < tonnage) {
            return res.status(400).send('Not enough stock available');
        }
        
        // Update stock and save produce item
        produceItem.tonnage -= tonnage;
        await produceItem.save();
        
        // Create a new credit entry
        const newCredit = new credit({
            buyername ,nationalid ,location ,contact , amountdue ,salesagent, producttype ,duedate ,producename ,tonnage ,dispatchdate 
            // Add other fields as required by your Credit model
        });
        await newCredit.save();
        
        res.redirect('/creditlist');
    } catch (err) {
        console.error('Error handling credit submission:', err);
        res.status(500).send('Server error');
    }
});




router.get('/receiptcredit/:id', async (req, res) => {
    try {
      const creditId = req.params.id;
  
      // Use the correct 'sales' model as per your import
      const credits = await credit.findById(creditId); 
  
      if (!credit) {
        return res.status(404).send('credit not found');
      }
  
      // Render the receipt view with the sale details
      res.render('receiptcredit', { credit });
    } catch (err) {
      console.error('Error fetching receipt details:', err); // Log the actual error
      return res.status(500).send('Error fetching receipt details');
    }
  });



// Display the list of credits
router.get('/creditlist', async (req, res) => {
    try {
        const creditItems = await credit.find().sort({ $natural: -1 }); 
        res.render('creditlist', {
            title: "credit List",
            credits: creditItems, // Rename to "produces"
        });
    } catch (error) {
        res.status(404).send("Unable to find items in the db");
        console.log("Error fetching produce", error);
    }
});





router.get("/updatecredit/:id", async (req, res) => {
    try {
        const item = await credit.findOne({ _id: req.params.id });
        res.render("updatecredit", {
            title: "Update credit list",
            credit: item,
        });
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
});




// POST route for updating produce
router.post("/updatecredit", async (req, res) => {
    try {
        await credit.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect("/creditlist");
    } catch (err) {
        res.status(400).send("Unable to update item in the database");
    }
});





// Handle deleting a credit
router.post("/deletecredit", async (req, res) => {
    try {
        await credit.deleteOne({ _id: req.body.id}); // Use findByIdAndDelete for simplicity
        res.redirect("back"); // Redirect to the previous page
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
});



module.exports = router;
