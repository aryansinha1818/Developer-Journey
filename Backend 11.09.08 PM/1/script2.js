var obj = {
  //   kuchBhi: kuchBhi79,
  name: "Aryan",
};

console.log(obj["name"]);
console.log(obj.name);

obj.name = "Sinha";
console.log(obj["name"]);
Object.freeze(obj);
obj.name = "Aryan";
console.log(obj["name"]);

//no of param is len
//functions are obj in js

//async

// line by line code chale isey kahte hai synchronous jo bhi code async nature ka ho, usey side stack mein bhej do and agle code ko chalao jo bhi sync nature ka ho, jab bhi saara syn code chal jaaye, tab check karo ki async code complete hua ya nahi and agar wo complete hua ho to usey main stack mein laao and chalao

//fetch - is bringing data and is asynchronous. It is not blocking.
async function abcd() {
  var blob = await fetch(`https://www.google.com`);
  var ans = await blob.json();
  console.log(ans);
}

abcd();
