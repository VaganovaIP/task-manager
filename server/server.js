const express = require("express");
require('dotenv').config();
const db = require('./config/db.js');
const router = require('./routes/index')
const cors = require('cors');
const bodyParser = require("express");
const port = process.env.PORT;

const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/', router);


db.sync({force:false})
    .then(()=>{
        app.listen(port, console.log('Server is running on port: ' + port));
    })
