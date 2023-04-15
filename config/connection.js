const mongoose = require('mongoose');

const connectString = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-working';

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
