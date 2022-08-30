const router = require('express').Router();

const {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller');

// Routes for users
router 
  .route('/')
  .get(getUsers)
  .post(addUser);

// Routes for getting user by Id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Routes for getting friends by Id
router
.route('/:id/friends/:friendId')
.put(addFriend)
.delete(deleteFriend);

module.exports = router;