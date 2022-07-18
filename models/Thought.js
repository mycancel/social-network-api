const { Schema, model } = require("mongoose");

// Schema for reaction subdocument
const reactionSchema = new Schema({
   reactionId: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  reactionBody:{
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date, 
    default: Date.now
    // TODO: create getter method to format the timestamp
  }
});

// Schema for Thought model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date, 
    default: Date.now
    // TODO: create getter method to format the timestamp
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

// Initialize the Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;