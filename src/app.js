require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/about", (req, res) => {
  res.send("my name is amir");
});

app.get("/whoami", (req, res) => {
  res.send(req.method + " " + req.url);
});

// نتّصلو بالداتابيز، و كي تنجح نشعلو السيرفر
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("the server is running :)");
    });
  })
  .catch((err) => {
    console.log("MongoDB error:", err.message);
  });
});





