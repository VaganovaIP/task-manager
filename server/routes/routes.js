const express = require('express');
const boardController = require('../controllers/BoardController');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/boards', boardController.fetchDataBoards);
router.get('/board/:name_board', TaskController.fetchDataTasks);

router.post('/board/:name_board', TaskController.postActions);
router.post('/boards', boardController.addBoard);

router.put('/board/:name_board', TaskController.putActions);

module.exports = router;
