var WebSocketServer = require("websocket").server;
var app = require("express")();
var httpServer = require("http").Server(app);
var PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/termy.html");
});

app.get("/termy.css", (req, res) => {
  res.sendFile(__dirname + "/termy.css");
});

app.get("/termyc.js", (req, res) => {
  res.sendFile(__dirname + "/termyc.js");
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/favicon.ico");
});

httpServer.listen(PORT, () => {
  logit("TERMINAL-Y STARTED ON PORT: " + PORT);
});

socketServer = new WebSocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false,
});

socketServer.on("request", (request) => {
  var connection = request.accept(null, request.origin);
  logit("Connection accepted.");

  connection.on("open", (message) => {
    logit("WS OPENED!");
  });

  connection.on("message", (message) => {
    if (message.type === "utf8") {
      logit("Received Message: " + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    }
  });

  connection.on("close", (reasonCode, description) => {
    logit("Peer " + connection.remoteAddress + " disconnected.");
  });
});

function logit(log_msg) {
  console.log(new Date() + ": " + log_msg);
}
