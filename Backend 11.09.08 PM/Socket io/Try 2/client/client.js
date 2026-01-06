const socket = io("ws://localhost:3001");

const form = document.querySelector("form");
const input = document.querySelector("input");
const p = document.querySelector("p");

function sendMessage(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
}

form.addEventListener("submit", sendMessage);

socket.on("message", (data) => {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = data;
  ul.appendChild(li);
  p.textContent = "";
});

input.addEventListener("keypress", () => {
  //activity
  socket.emit("activity", socket.id.substring());
});

let activityTimer;

socket.on("activity", (name) => {
  p.textContent = `${name} is typing......`;

  //clear after 3 sec
  clearTimeout = setTimeout(() => {
    p.textContent = "";
  }, 3000);
});
