const managerRouter = require("./routes");
const express = require("express");
const router = express.Router();

router.use('/',managerRouter);


module.exports = router;