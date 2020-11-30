const express = require('express');
const path = require('path');
const app = express(),
bodyParser = require("body-parser");
port = 3080;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './app/build')));

app.get('/', (req,res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, './app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});