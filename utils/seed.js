// this file will be used to seed the database with some starter data
const connection = require('../config/connection');
const { User, Thought } = require('../models');

// this connection.once() method will run the code inside of it once the connection to the database is open
connection.once('open', async () => {
  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    // this will create the users and thoughts
    const userData = await User.create([
      {
        username: 'maximilianthaman',
        email: 'maximilianthaman@gmail.com',
        thoughts: [],
        friends: []
      },
      {
        username: 'maximilian',
        email: 'maximilian@gmail.com',
        thoughts: [],
        friends: []
      },
      
    ]);
    
    const thoughtData = await Thought.create([
      {
        thoughtText: 'This is a random thought',
        createdAt: new Date(),
        username: 'maximilian',
        reactions: [
          {reactionBody: 'This is a reaction', username: 'maximilian', createdAt: new Date()},
        ]
      },
      {
        thoughtText: 'This is another random thought',
        createdAt: new Date(),
        username: 'maximilianthaman',
        reactions: [
          {reactionBody: 'This is another reaction', username: 'maximilianthaman', createdAt: new Date()},
        ]
      },
    ]);
// this will update the users and thoughts with the correct ids
    await User.updateMany({}, { $push: { thoughts: thoughtData } });
    await User.updateMany({}, { $push: { friends: userData } });

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

