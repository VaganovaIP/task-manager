const managerRouter = require("./routes");
const lists = require("./lists");
const express = require("express");
const router = express.Router();

//router.use('/boards/board',lists);
router.use('/',managerRouter);


module.exports = router;