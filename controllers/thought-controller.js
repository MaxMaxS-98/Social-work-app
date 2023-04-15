const { Thought,User } = require('../models/User');
// const { deleteThought } = require('../../controllers/thought-controller');

// this is the exported object from this file
module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // this is the method that will be called when the route is hit with a GET request
  getThoughtById(req, res) {
    Thought.findById({_id: req.params.thoughtId})
      .then((thought) =>{
        if(!thought){
          res.status(404).json({message: 'No thought with that ID'});
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // create a new post using data in req.body
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // update a post by its _id using data in req.body and return the updated post
  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      {_id: req.params.thoughtId},
      req.body,
      {new: true}
    )
      .then((thought) => {
        if(!thought){
          res.status(404).json({message: 'No thought with that ID'});
          return;
        }
        res.json(thought);
      }
      )
      .catch((err) => res.status(500).json(err));
  },  
  // delete a post by its _id and return the deleted post document (or null if no post was deleted)
  deleteThought(req, res) {
    Thought.findByIdAndDelete({_id: req.params.thoughtId})
      .then((thought) => {
        if(!thought){
          res.status(404).json({message: 'No thought with that ID'});
          return;
        }
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => res.status(500).json(err));
  },
  // this will add a reaction to a thought by its _id
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$push: {reactions: req.body}},
      {new: true}
    )
      .then((thought) => {
        if(!thought){
          res.status(404).json({message: 'No thought with that ID'});
          return;
        }
        res.json(thought);
      }
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$pull: {reactions: {reactionId: req.params.reactionId}}},
      {new: true}
    )
      .then((thought) => {
        if(!thought){
          res.status(404).json({message: 'No thought with that ID'});
          return;
        }
        res.json(thought);
      }
      )
      .catch((err) => res.status(500).json(err));
  }
};
