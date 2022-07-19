const { Schema, model, Types } = require("mongoose");

const getTime = (date) => {
  return date.toLocaleDateString();
};

// Schema for reaction subdocument
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: getTime,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

// Schema for Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: getTime,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Initialize the Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
