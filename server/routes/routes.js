const express = require('express');
const boardController = require('../controllers/BoardController');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/boards', boardController.fetchDataBoards);
router.get('/board/:name_board', TaskController.fetchDataTasks);

router.post('/board/:name_board', TaskController.postActions);
router.post('/boards', boardController.addBoard);

router.put('/board/:name_board', TaskController.putActions);

router.delete('/board/:name_board',TaskController.deleteActions);
router.delete('/boards', boardController.deleteBoard);


module.exports = router;
