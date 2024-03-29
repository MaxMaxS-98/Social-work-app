const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');
const moment = require('moment');


// Schema to create Post model 
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
   
    toJSON: {
      virtual: true,
      getters: true
    },
    id: false
  }
);

// Create a virtual property `upvoteCount` that gets the amount of comments per user
thoughtSchema.virtual('reactionCount')
  // Getter method that returns the length of the user's comments array field on query
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Post model using the PostSchema we just created
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
