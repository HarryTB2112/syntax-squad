const cors = require("cors");
const express = require("express");
const app = express();
const geography = require("./geography.json");
const logger = require("./logger");

app.use(logger);
app.use(cors());
app.use(express.json());

//gets the countries-capitals
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `Welcome to the geography API! There are ${geography.length} available.`
    );
});

app.get("/geography", (req, res) => {
  res.status(200).send(geography);
});

app.get("/geography/random", (req, res) => {
  const randomNumber = Math.floor(Math.random() * geography.length);
  res.status(200).send(geography[randomNumber]);
});

module.exports = app;
