const express = require('express');
const boardController = require('../controllers/BoardController');
const TaskController = require('../controllers/TaskController');
const multer = require("multer");

const router = express.Router();
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        const originalName = Buffer.from(
            file.originalname, 'latin1')
            .toString('utf-8');
        cb(null, originalName);
    }
});

const upload = multer({storage:storageConfig}).single("file");


router.get('/boards', boardController.fetchDataBoards);
router.get('/board/:name_board', TaskController.fetchDataTasks);
router.get('/all-tasks', TaskController.fetchDataTasksAll);

router.post('/board/:name_board', upload, TaskController.postActions);
router.post('/boards', boardController.addBoard);

router.put('/board/:name_board', TaskController.putActions);

router.delete('/board/:name_board',TaskController.deleteActions);
router.delete('/boards', boardController.deleteBoard);


module.exports = router;
