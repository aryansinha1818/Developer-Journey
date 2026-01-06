// Select the database to use.
use("SigmaDatabase");

// Insert a few documents into the courses collection.
db.getCollection("courses").insertMany([
  {
    name: "Python",
    Price: 18000,
    Author: "Alice",
  },
  {
    name: "C++",
    Price: 22000,
    Author: "Bob",
  },
  {
    name: "JavaScript",
    Price: 15000,
    Author: "Charlie",
  },
  {
    name: "Ruby",
    Price: 21000,
    Author: "Dave",
  },
  {
    name: "Go",
    Price: 19000,
    Author: "Eve",
  },
]);

// Print a message to the output window.
console.log(`Done inserting Data`);
