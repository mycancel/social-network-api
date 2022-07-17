const { Schema, model } = require("mongoose");

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
    // TODO: relationship with thoughts
    // thoughts: [Thought],
    // TODO: Self-reference for friends
    // friends: [userSchema],
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
