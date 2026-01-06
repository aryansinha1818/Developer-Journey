const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", function (req, res) {
  res.send("hey it's working");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    const onwners = await ownerModel.find();
    if (onwners.length > 0) {
      return res
        .status(502)
        .send("You don't have permission to create an owner");
    }

    let { fullname, email, password } = req.body;

    const createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  });
}

module.exports = router;
