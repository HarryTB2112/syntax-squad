const cors = require("cors");
const express = require("express");
const app = express();
const geography = require("./geography.json");
const logger = require("./logger");
const italian = require("./italian.json");

app.use(logger);
app.use(cors());
app.use(express.json());

//gets the countries-capitals
app.get(`/`, (req, res) => {
  res.send(
    `Welcome to the Brainville API! There are ${geography.length} geography objects available. \nThere are ${italian.length} italian objects available`
  );
});

app.get(`/italian`, (req, res) => {
  res.status(200).send(italian);
});

app.get(`/geography`, (req, res) => {
  res.status(200).send(geography);
});

app.get(`/italian/random`, (req, res) => {
  const randomIndex = Math.floor(Math.random() * italian.length);
  res.status(200).send(italian[randomIndex]);
});

app.get(`/geography/random`, (req, res) => {
  const randomNumber = Math.floor(Math.random() * geography.length);
  res.status(200).send(geography[randomNumber]);
});

//connecting back-end to front-end
app.post("/geography", (req, res) => {
  const newCountry = req.body;

  for (let i = 0; i < geography.length; i++) {
    if (
      newCountry.country.toLowerCase() === geography[i].country.toLowerCase()
    ) {
      res.sendStatus(409);
      return;
    }
    if (newCountry.country === "" || newCountry.capital === "") {
      res.sendStatus(404)
      return
    }
  }
  geography.push(newCountry);
  res.status(201).send(newCountry);
  console.log("pushed");
});

module.exports = app;
