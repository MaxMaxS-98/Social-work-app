const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');


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
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
   
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Create a virtual property `upvoteCount` that gets the amount of comments per user
thoughtSchema.virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Post model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
