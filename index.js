const express = require("express");
const app = express();
const cors = require('cors');
const router = require("./routes/index.js");
const bodyParser = require('body-parser')
require("dotenv").config();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.APP_PORT, function () {
    console.log(`Server running on http://localhost:${process.env.APP_PORT}`);
});

module.exports = app;