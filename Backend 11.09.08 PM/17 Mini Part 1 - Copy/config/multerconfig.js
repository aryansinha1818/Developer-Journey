const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

//disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    // why because we want to save the file with a unique name and prevent overwriting
    crypto.randomBytes(12, function (err, name) {
      const fn = name.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });

// export and upload variable

module.exports = upload;
