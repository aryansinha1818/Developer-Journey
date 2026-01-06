let id = document.getElementById("id1");

async function myFunc() {
  let getting = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      accept: "application/json",
    },
  });
  let value = await getting.json();
  let data = value.joke;
  id.innerHTML = data;
}

myFunc();
