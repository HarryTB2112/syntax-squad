const express = require('express');
const app = express();
const cors = require('cors');
const geography = require('./geography.json');
const logger = require("./logger");
const italian = require('./italian.json');


app.use(cors());
app.use(express.json())


//gets the countries-capitals
app.get(`/`, (req, res) =>{
    res.send(`Welcome to the geography API! There are ${geography.length} available.`);
})

//gets the italian-english words
app.get(`/`, (req, res) =>{
    res.send(`Welcome to the vocabulary API! There are ${italian.lenght} available`)
})


app.get(`/italian`, (req, res)=>{
    res.status(200).send(italian);
})

app.get(`/geography`, (req, res)=>{
    //res.send(geography);
    res.status(200).send(geography);
})

app.get(`/italian/random`, (req, res) => {
    const randomIndex = Math.floor(Math.random() * italian.length);
    res.send(italian[randomIndex]);
    res.status(200);
  });

app.get(`/geography/random`, (req, res) =>{
    const randomNumber = Math.floor(Math.random() * geography.length)
    res.send(geography[randomNumber]);
    res.status(200)//.send(geography)
})



module.exports = app;