const { connect, connection } = require('mongoose');

const connectString = 
  process.env.MONGODB_URI || 'mongodb://localhost:27017/social-working';

connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = connection;
