const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// app.get("/read", function (req, res) {
//   console.log(req.cookies); // This will now work
//   res.send("read page");
// });

// app.get("/", (req, res) => {
//   res.cookie("name", "Sinha");
//   res.send("Cookie set successfully!");
// });

// encrypting password

// app.get("/", function (req, res) {
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash("helloKittu", salt, function (err, hash) {
//       console.log(hash); // Store hash in your
//     });
//   });
// });

// decrypting password, the password has been created now we are matching it with the hash
// app.get("/", (res, req) => {
// Load hash from your password DB.
//   bcrypt.compare(
//     "helloKittu",
//     "$2b$10$FecI6ZoHpIwLV3TRdP8m8.ZaTtl0Kej/c9VFyi6.cxJdmluwj4vX2",
//     function (err, result) {
//       console.log(result); // result == true
//     }
//   );
// });

//jwt token
app.get("/", (req, res) => {
  const token = jwt.sign({ email: "aryan@exmample.com" }, "lemonade");
  res.cookie("token", token);
  res.send("Cookie set successfully!");
});

app.get("/read", (req, res) => {
  // console.log(req.cookies.token); // This will now work
  let data = jwt.verify(req.cookies.token, "lemonade");
  console.log(data);
});

app.listen(3000);

// This code sets up a basic Express server that uses JWT (JSON Web Token) for managing user identity via cookies. When someone visits the root route /, the server creates a JWT with an email payload (aryan@exmample.com) and signs it using a secret key (lemonade). It then sends this token to the user’s browser as a cookie named "token". When the user later visits /read, the server reads the token from the cookie, verifies it using the same secret key to ensure it’s not tampered with, and logs the decoded data (which includes the email). This setup mimics how authentication works: creating a signed identity on login and verifying it in future requests. 💪 You're one step closer to backend mastery!
