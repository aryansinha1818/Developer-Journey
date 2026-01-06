const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postdata: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);

//means you're linking or referencing another collection (called "user") in your MongoDB database. Let’s simplify what’s going on:

//📎 ref: "user"
// You're telling Mongoose: this ObjectId comes from the "user" model (probably defined in another file like user.js).

// This allows Mongoose to connect posts with users, so every post knows who created it.
// This is super useful for things like showing all posts by a specific user or finding out who made a post.
// So, in short, this line is like saying: "Hey, this post belongs to a user, and I want to know which one!"
