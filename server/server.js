const express = require("express");
const db = require('./db.js');
const managerRouter = require('./routes/routes');
const lists = require('./routes/lists')
const router = require('./routes/index')
const cors = require('cors');
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

db.sync({force:false})
    .then(()=>{
        app.listen(port, console.log('Server is running on port: ' + port));
    })
