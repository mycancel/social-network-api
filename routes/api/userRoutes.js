// @/api/users
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser
  // addNewFriend,
  // deleteFriend
} = require('../../controllers/userController');

// @/api/users
router.route('/')
  .get(getUsers)
  .post(createNewUser);

// @/api/user/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// @/api/user/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId')
//   .post(addNewFriend)
//   .delete(deleteFriend);

module.exports = router;