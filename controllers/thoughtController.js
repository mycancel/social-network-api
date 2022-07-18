const { Thought } = require("../models");

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
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
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
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Add reaction by thoughtId
  // createReaction(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.thoughtId },
  //     { $push: { reactions: req.body } },
  //     { new: true }
  //   )
  //     .then((thought) => res.json(thought))
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(500).json(err);
  //     });
  // },
  // Removes reaction from thought's reaction list
  // deleteReaction(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.thoughtId },
  //     { $pull: { reactions: req.params.reactionId } },
  //     { new: true }
  //   )
  //     .then((thought) => res.json(thought))
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(500).json(err);
  //     });
  // },
};
