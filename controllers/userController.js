// getUsers,
// getSingleUser,
// createNewUser,
// updateUser,
// deleteUser,
// addNewFriend,
// deleteFriend

const { User } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user by userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createNewUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Update user by userId
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, {...req.body})
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  }
};