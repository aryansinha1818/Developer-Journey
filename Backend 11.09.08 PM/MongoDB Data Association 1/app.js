const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "aryan",
    age: 25,
    email: "aryan@gmail.com",
  });
  res.send(user);
});
app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postdata: "Hello Saare log",
    user: "6807a44ca53ad4730b98f7c0",
  });
  //user ko dhond0o
  let user = await userModel.findOne({ _id: "6807a44ca53ad4730b98f7c0" });

  user.posts.push(post._id);
  await user.save();

  res.send({ post, user });
});

app.listen(3000);
