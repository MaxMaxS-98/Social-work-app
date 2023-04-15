const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.once('open', async () => {
  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    const userData = await User.create([
      {
        username: 'maximilianthaman',
        email: 'maximilianthaman@gmail,com',
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
          {reactionId: '1', reactionBody: 'This is a reaction', username: 'maximilian', createdAt: new Date()},
        ]
      },
      {
        thoughtText: 'This is another random thought',
        createdAt: new Date(),
        username: 'maximilianthaman',
        reactions: [
          {reactionId: '2', reactionBody: 'This is another reaction', username: 'maximilianthaman', createdAt: new Date()},
        ]
      },
    ]);

    await User.updateMany({}, { $push: { thoughts: thoughtData } });
    await User.updateMany({}, { $push: { friends: userData } });

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

