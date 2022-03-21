const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 3000;

// ENABLE CORS FOR TESTING PURPOSES
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(bodyParser.urlencoded({ extended: false }));

// ENABLE USE OF STATIC FILES
app.use("/public", express.static(__dirname + "/public"));

// LOG REQUEST INFORMATION
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// HOME PAGE ROUTING
app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.socket.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

const listener = app.listen(port, function () {
  console.log(
    "request-header-parser-microservice is listening on port " +
      listener.address().port
  );
});
