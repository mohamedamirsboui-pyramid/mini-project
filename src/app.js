require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// bech el server yfahem el JSON elli ykhallih el user (req.body)
app.use(express.json());

// n7ottou el routes mta3 l'authentification taht /auth
app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/about", (req, res) => {
  res.send("my name is amir");
});

app.get("/whoami", (req, res) => {
  res.send(req.method + " " + req.url);
});

// nconnectiw lel base de données, w ki tnajah nechaghlou el server
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
