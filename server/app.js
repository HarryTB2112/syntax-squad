const cors = require("cors");
const express = require("express");
const app = express();
const geography = require("./geography.json");
const logger = require("./logger");
const italian = require('./italian.json');


app.use(logger);
app.use(cors());
app.use(express.json());


//gets the countries-capitals
app.get(`/`, (req, res) =>{
    res.send(`Welcome to the Brainville API! There are ${geography.length} geography objects available. \nThere are ${italian.length} italian objects available`);
})

app.get(`/italian`, (req, res)=>{
    res.status(200).send(italian); 
})

app.get(`/geography`, (req, res)=>{
    res.status(200).send(geography);
})

app.get(`/italian/random`, (req, res) => {
    const randomIndex = Math.floor(Math.random() * italian.length);
    res.status(200).send(italian[randomIndex]);
  });

app.get(`/geography/random`, (req, res) =>{
    const randomNumber = Math.floor(Math.random() * geography.length)
    res.status(200).send(geography[randomNumber]);

})



module.exports = app;
