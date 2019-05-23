const express = require("express");

const router = require("./data/users-router");

const server = express();

server.use(express.json());

server.use("/users", router);

server.get("/", (req, res) => {
  res.send("It's alive!!!");
});

module.exports = server;
