const express = require('express');
const boardController = require('../controllers/boards');


const urlencodedParser = express.urlencoded({extended: false});

const router = express.Router();
router.get('/boards', boardController.getBoards);
router.post('/boards', boardController.addBoard);


module.exports = router;
