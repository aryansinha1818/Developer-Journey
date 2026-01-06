const fs = require("fs/promises");

fs.writeFile("hey.txt", "Hi am a file", function (err) {
  if (err) console.error(err);
  else console.log("Done");
});

fs.appendFile("hey.txt", "then new append text will be added", function (err) {
  if (err) console.error(err);
  else console.log("Done");
});

fs.rename("hey.txt", "Hello World from Nodejs", function (err) {
  if (err) console.log(err);
  else console.log("done");
});
