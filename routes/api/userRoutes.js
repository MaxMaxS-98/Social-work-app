const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// this is the exported object from this file
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// this route will be used to get a single user, update a user, and delete a user by its _id
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// this route will be used to add and remove friends to a user's friend list
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);


module.exports = router;
