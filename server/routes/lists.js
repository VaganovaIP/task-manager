const listController = require('../controllers/tasksBoard');
const express = require("express");
const boardController = require("../controllers/board");

const router = express.Router();

//router.get('/boards/board/:board_id', boardTasksController.getName);
router.get('/:board_id', listController.listsViewAll);


router.post('/boards/board/:board_id', boardController.addBoard);
//router.post('/boards/board/:board_id', listController.addList);

module.exports = router;