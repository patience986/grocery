const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define the schema for users
const SignupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  branch: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['manager', 'salesagent'], // Define valid roles
    required: true
  }
});

// Plugin passport-local-mongoose to handle username and password
SignupSchema.plugin(passportLocalMongoose, {
  usernameField: 'email' // Use email instead of username for login
});

module.exports = mongoose.model('Signup', SignupSchema);
