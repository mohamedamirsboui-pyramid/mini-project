const express = require("express");
const app = express();

app.get("/about", (req, res) => {
  res.send("my name is amir");
});

app.get("/whoami", (req, res) => {
  res.send(req.method + " " + req.url);
});

app.listen(3000, () => {
  console.log("the server is running :)");
});





