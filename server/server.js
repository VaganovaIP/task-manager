const express = require("express");
require('dotenv').config();
const db = require('./config/db.js');
const router = require('./routes/index')
const cors = require('cors');
const bodyParser = require("express");
const passport = require("passport");
require('./config/passport');
const {v4: uuidv4} = require("uuid");
const port = process.env.PORT;


const app = express();
app.use(passport.initialize());
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);

db.sequelize.sync({force:false})
    .then(()=>{
        console.log(`Listen server port ${port}`)
        app.listen(port);
    })
    .catch(err => console.log(err))

module.exports = app