const express = require("express");
const db = require('./db.js');
const router = require('./routes/index')
const cors = require('cors');
const bodyParser = require("express");
const port = 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/', router);


db.sync({force:false})
    .then(()=>{
        app.listen(port, console.log('Server is running on port: ' + port));
    })
