const express = require('express');
const boardController = require('../controllers/BoardController');
const boardTasksController = require('../controllers/TaskController');

const router = express.Router();

router.get('/boards', boardController.fetchDataBoards);
router.get('/board/:name_board', boardTasksController.fetchDataTasks);

router.post('/board/:name_board', boardTasksController.postActions);
router.post('/boards', boardController.addBoard);

router.put('/board/:name_board', boardTasksController.putActions);

module.exports = router;
