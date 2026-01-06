var express = require("express");
var router = express.Router();
const userModel = require("./users");

router.get("/", (req, res) => {
  res.render("index");
});

// router.get("/create", async function (req, res) {
//async function, so it would go in the side stack and when the sync code would get over then this would execute.
//   const createdUser = await userModel.create(
//inside an object is passed, same as schema
//     {
//       username: "knick",
//       name: "Users",
//       age: 25,
//     }
//   );
//this would run without above line being right or wrong
//   res.send(createdUser);
// so we want ki phele create ho jaey then kuch ho
// });

//find
// router.get("/allusers", async function (req, res) {
//   let allusers = await userModel.find();
//   res.send(allusers);
// });

//find one

module.exports = router;
