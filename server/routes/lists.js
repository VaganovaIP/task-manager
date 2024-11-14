const listController = require('../controllers/list');
const express = require("express");
const boardController = require("../controllers/board");

const router = express.Router();

//router.get('/boards/board/:board_id', boardTasksController.getName);
router.get('/:board_id', listController.listsViewAll);


router.post('/boards', boardController.addBoard);
router.post('/boards/board/:board_id', listController.addList);

module.exports = router;