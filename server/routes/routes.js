const express = require('express');
const boardController = require('../controllers/BoardController');
const TaskController = require('../controllers/TaskController');
const AuthController = require('../controllers/AuthController');
const multer = require("multer");
const passport = require("passport");
const UserController = require("../controllers/UserController");
const TaskActions = require('../controllers/TaskActions');
const FilesTaskController = require("../controllers/FilesTaskController");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        const task_id = req.headers['task-id'];
        const taskDir = path.join(__dirname, '../uploads', task_id);

        if (!fs.existsSync(taskDir)) {
            fs.mkdirSync(taskDir, { recursive: true });
        }

        cb(null, taskDir);
    },
    filename: (req, file, cb) =>{
        const originalName = Buffer.from(
            file.originalname, 'latin1')
            .toString('utf-8');
        cb(null, originalName);
    }
});

const upload = multer({storage:storageConfig}).single("file");

router.get('/boards', passport.authenticate('jwt', { session: false }), boardController.fetchDataBoards);
router.get('/board/:name_board', passport.authenticate('jwt', { session: false }), TaskActions.getActions);
router.get('/all-tasks', passport.authenticate('jwt', { session: false }), TaskController.fetchDataTasksAll);

router.post('/board/:name_board', passport.authenticate('jwt', { session: false }), upload, TaskActions.postActions);
router.post('/boards', passport.authenticate('jwt', { session: false }), boardController.addBoard);

router.put('/boards', passport.authenticate('jwt', { session: false }), UserController.updateDataUser);
router.put('/board/:name_board', passport.authenticate('jwt', { session: false }), TaskActions.putActions);
router.put('/all-tasks', passport.authenticate('jwt', { session: false }), UserController.updateDataUser);

router.delete('/board/:name_board', passport.authenticate('jwt', { session: false }), TaskActions.deleteActions);
router.delete('/boards', passport.authenticate('jwt', { session: false }), boardController.deleteBoard);

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);


module.exports = router;
