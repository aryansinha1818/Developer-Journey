const socket = io("ws://localhost:3001");

const form = document.querySelector("form");

function sendMessage(e) {
  const input = document.querySelector("input");
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
}

form.addEventListener("submit", (e) => {
  sendMessage(e);
});

socket.on("message", (data) => {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = data;
  ul.appendChild(li);
});
