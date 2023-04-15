const User = require('../models/User');

module.exports = {
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
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // update a user by its _id
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

  // delete a user by its _id
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
