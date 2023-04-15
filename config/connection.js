// This file is used to connect to the database
const mongoose = require('mongoose');
// this is the connection string for the database that is hosted on MongoDB 
const connectString = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-working';
// this is the connection to the database 
mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
