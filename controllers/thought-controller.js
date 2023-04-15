const { Thought } = require('../models');
const { deleteThought } = require('../../controllers/thought-controller');


module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
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
  // create a new post
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // update a post by its _id
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
  // delete a post by its _id
  deleteThought(req, res) {
    Thought.findByIdAndDelete({_id: req.params.thoughtId})
      .then((thought) => {
        if(!thought){
          res.status(404).json({message: 'No thought with that ID'});
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  
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
  deleteReaction(req, res) {
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
