const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      // Removes the __v field
      .select("-__v")
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought by thoughtId
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // Removes the __v field
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought with thoughtId and userId
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Thought Created, but User Not Found" })
          : res.json("Created New Thought")
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Update thought by thoughtId
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { ...req.body },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Delete thought by thoughtId
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        return User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
      })
      .then((user) =>
      !user
        ? res.json({ message: 'Thought deleted but no user with this id!' })
        : res.json({ message: 'Thought successfully deleted from user!' })
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Add reaction by thoughtId
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Removes reaction from thought's reaction list
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};
