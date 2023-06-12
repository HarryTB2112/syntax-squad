const express = require("express");
const app = express();
const cors = require("cors");
const geography = require("./geography.json");
const logger = require("./logger");

app.use(cors());
app.use(express.json());
app.use(logger);

//gets the countries-capitals
app.get("/", (req, res) => {
  res.send(
    `Welcome to the geography API! There are ${geography.length} available.`
  );
});

app.get("/geography", (req, res) => {
  res.send(geography);
  res.status(200).send(geography);
});

app.get("/geography/random", (req, res) => {
  const randomNumber = Math.floor(Math.random() * geography.length);
  res.send(geography[randomNumber]);
  res.status(200).send(geography);
});

module.exports = app;
