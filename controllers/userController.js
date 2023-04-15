const User = require('../models/User');
// this is the exported object from this file
module.exports = {
  // get all users and populate their thoughts
  getAllUsers(req, res) {
    User.find()
    .populate({
      path: 'thoughts',
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
  },
  // get a single user by its _id and populate its thoughts and friends
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: 'thoughts',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with that ID' });
          return;
        }
        res.json(dbUserData);
      }
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      }
      );
  },
  // create a new user using data in req.body and return the new user document
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // update a user by its _id using data in req.body and return the updated user document
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with that ID' });
          return;
        }
        res.json(dbUserData);
      }
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a user by its _id and return the deleted user document (or null if no user was deleted)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with that ID' });
          return;
        }
        res.json(dbUserData);
      }
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with that ID' });
          return;
        }
        res.json(dbUserData);
      }
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a friend from a user's friend list by its _id and return the updated user document
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with that ID' });
          return;
        }
        res.json(dbUserData);
      }
      )
      .catch((err) => res.status(500).json(err));
  }
};
