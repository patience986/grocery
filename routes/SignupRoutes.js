const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const Signup = require('../models/Signup');

// Middleware for flash messages
router.use(flash());

// Render the signup form
router.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('error') });
});

// Handle user signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, branch, role } = req.body;

    // Check if user already exists
    const user = await Signup.findOne({ email });
    if (user) {
      req.flash('error', 'User already exists.');
      return res.redirect('/signup');
    }

    // Create a new user
    const newUser = new Signup({
      username,
      email,
      branch,
      role
    });

    // Register the new user with password (passport-local-mongoose handles hashing)
    Signup.register(newUser, password, (err, user) => {
      if (err) {
        console.error('Error during signup:', err);
        req.flash('error', 'Error signing up the user.');
        return res.redirect('/signup');
      }

      // Redirect to login on successful signup
      req.flash('success', 'User signed up successfully.');
      res.redirect('/login');
    });
  } catch (err) {
    console.error('Error during signup:', err);
    req.flash('error', 'Error signing up the user.');
    res.redirect('/signup');
  }
});

// Render the login form
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

// Handle login and role-based redirection
router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true, // Use flash messages for login errors
  }),
  (req, res) => {
    try {
      console.log('Authentication successful');
      console.log('Authenticated user:', req.user);

      if (!req.user) {
        console.error('Error: req.user is undefined');
        return res.status(500).send('Authentication error');
      }

      req.session.user = req.user; // Store the authenticated user in session
      console.log('User session set:', req.session.user);

      // Role-based redirection
      switch (req.user.role) {
        case 'manager':
          console.log('Redirecting manager to /dashboard');
          return res.redirect('/dashboard');
        case 'salesagent':
          console.log('Redirecting sales agent to /sdashboard');
          return res.redirect('/sdashboard');
        default:
          console.warn('Unrecognized user role:', req.user.role);
          return res.status(400).send('User role is not recognized in the system.');
      }
    } catch (err) {
      console.error('Error during redirection:', err);
      return res.status(500).send('An error occurred during login.');
    }
  }
);

module.exports = router;
