const express = require('express');
const boardController = require('../controllers/boards');
const boardTasksController = require('../controllers/tasksBoard');


const urlencodedParser = express.urlencoded({extended: false});

const router = express.Router();
router.get('/boards', boardController.getBoards);
router.post('/boards/board/:name', boardController.addBoard);
router.get('/boards/board/:name', boardTasksController.getName);

module.exports = router;
