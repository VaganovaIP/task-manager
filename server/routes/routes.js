const express = require('express');
const boardController = require('../controllers/board');
const boardTasksController = require('../controllers/tasksBoard');
const listController = require('../controllers/list');


const urlencodedParser = express.urlencoded({extended: false});

const router = express.Router();
router.get('/boards', boardController.boardsView);
//router.get('/boards/board/:board_id', boardTasksController.getName);
router.get('/boards/board/:board_id', listController.listsView);


router.post('/boards', boardController.addBoard);
router.post('/boards/board/:board_id', listController.addList);

module.exports = router;
