const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/testingDB");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  age: Number,
  //post ek array hai of type id
  posts: [
    {
      //yaani posts ka type id hai
      type: mongoose.Schema.Types.ObjectId,
      // id belong to which model
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
