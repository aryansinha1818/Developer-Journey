var arr = [1, 2, 3, 4, {}, true, function () {}, [], "Aryan"];

//foreach, map, filter, indexOf

arr.forEach(function (val) {
  console.log(val + "hello");
});

let arr1 = [1, 2, 3, 4];

//diye hue array se ek aur array create karna chahte ho
const a = arr1.map((val) => {
  return val * 3;
});
console.log(a);

//filter - new array, either of same size or less
let b = arr1.filter(function (val) {
  if (val > 3) {
    return true;
  }
});
console.log(b);

let c = arr1.find(function (x) {
  if (x === 2) return x;
});
console.log(c);

// indexof
