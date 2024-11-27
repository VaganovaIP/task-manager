const express = require('express');
const boardController = require('../controllers/board');
const boardTasksController = require('../controllers/tasksBoard');
const taskController = require('../controllers/tasksBoard');


const router = express.Router();
router.get('/boards', boardController.boardsView);
router.get('/board/:name_board', boardTasksController.tasksView);

//router.post('/boards/board/:name_board', taskController.createListTask);

//router.post('/boards/board/:board_id', taskController.addTask);

module.exports = router;
