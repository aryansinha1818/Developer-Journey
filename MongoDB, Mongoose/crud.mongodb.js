use("CrudDb");
db.createCollection("courses");
db.courses.insertOne({
  name: "Harry's web dev free course",
  price: 0,
  assignments: 12,
  projects: 45,
});

db.courses.insertMany([
  {
    name: "Harry's web dev free course",
    price: 0,
    assignments: 12,
    projects: 45,
  },
  {
    name: "JavaScript for Beginners",
    price: 29.99,
    assignments: 8,
    projects: 15,
  },
  {
    name: "Python Programming Bootcamp",
    price: 149.99,
    assignments: 30,
    projects: 10,
  },
  {
    name: "Data Science with Python",
    price: 99.99,
    assignments: 20,
    projects: 25,
  },
  {
    name: "Machine Learning Crash Course",
    price: 199.99,
    assignments: 15,
    projects: 30,
  },
]);

console.log(a.count());
