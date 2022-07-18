const { User } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      // Removes the __v field
      .select("-__v")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user by userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // Removes the __v field
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that id" })
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
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { ...req.body },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Delete user by userId
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Add new friend by userId and friendId
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Removes friend from user's friend list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};
