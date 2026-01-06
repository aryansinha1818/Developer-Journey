const express = require("express");

const app = express();

//now this user model module is imported and can be used to create new users in the database
//and we can do CRUD operations on the user model.
const userModel = require("./userModel");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    name: "Aryan Sinha",
    email: "aryansinha1818@gmail.com",
    username: "aryansinha1818",
  });
  res.send(user);
});

app.get("/update", async (req, res) => {
  let user = await userModel.findOneAndUpdate(
    { username: "aryansinha1818" },
    { name: "Aryan Sinha Updated" },
    { new: true }
  );
  res.send(user);
});

app.listen(3000);
