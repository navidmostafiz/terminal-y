var socket = new WebSocket("ws://localhost:9000");

socket.addEventListener("open", function (event) {
  console.log("WS OPENED!");
});

socket.send("Hello Server!");

socket.addEventListener("message", function (event) {
  console.log("Message from server: ", event.data);
});

socket.addEventListener("close", function (event) {
  console.log("WS CLOSED!");
});
