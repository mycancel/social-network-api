const { Schema, model } = require("mongoose");

// Schema for thought subdocument
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

// Schema for what makes up user information
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: "/^([a-z0-9._-]+)@([a-z0-9.]+)$/gm",
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Retrieves length of user's friends array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize the User model
const User = model("user", userSchema);

module.exports = User;
