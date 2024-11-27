//Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressSession = require("express-session");
const passport = require("passport");
const flash = require('connect-flash')



// Mongoose for MongoDB connection
const sessionConfig = expressSession({
secret: "secret",
resave: false,
saveUninitialized: false
});


// dotenv to load env variables
require('dotenv').config();





//import models
const Signup = require('./models/Signup');
const sales = require('./models/sales');
 const credit= require('./models/credit');




//importing routes
const produceRoutes = require('./routes/produceRoutes');
const grocerystoreRoutes = require('./routes/grocerystoreRoutes'); 
const salesRoutes = require('./routes/salesRoutes');
const creditRoutes = require('./routes/creditRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const SignupRoutes = require('./routes/signupRoutes');
const sdashboard =require('./routes/sdashboardRoutes');





// Instantiations
const app = express();
const port = 3080;

//set the views path
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));



// set db connection to mongoose
mongoose.connect(process.env.DATABASE_LOCAL, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});


mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.error(`Connection error: ${err.message}`);
  });



//set view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


//middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());








// express session configs
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

// passport configs
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());




app.use(flash());

// Middleware to make flash messages accessible in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // Passport uses this for error messages
  next();
});



// Ensure Manager Middleware
function ensureManager(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'manager') {
    return next(); // User is authenticated and a manager, proceed to the next middleware
  }
  // If user is not a manager, deny access
  res.status(403).send('Access denied. Managers only.');
}

// Ensure SalesAgent Middleware (optional)
function ensureSalesAgent(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'salesagent') {
    return next(); // User is authenticated and a sales agent, proceed
  }
  // If user is not a sales agent, deny access
  res.status(403).send('Access denied. Sales Agents only.');
}


//Routes
app.use('/', produceRoutes);
app.use('/', grocerystoreRoutes);
app.use('/', salesRoutes);
app.use('/', creditRoutes);
app.use('/', dashboardRoutes);
app.use('/', receiptRoutes);
app.use('/', SignupRoutes);
app.use('/', sdashboard);
 


app.get("*", (req, res) => {
  res.send("error! page does not exist");
});




//server
app.listen(port, () => console.log(`listening on port ${port}`));

