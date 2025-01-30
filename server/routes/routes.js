const express = require('express');
const boardController = require('../controllers/BoardController');
const TaskController = require('../controllers/TaskController');
const AuthController = require('../controllers/AuthController');
const multer = require("multer");
const passport = require("passport");
const UserController = require("../controllers/UserController");

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

router.get('/boards', passport.authenticate('jwt', { session: false }), boardController.fetchDataBoards);
router.get('/board/:name_board', passport.authenticate('jwt', { session: false }), TaskController.fetchDataTasks);
router.get('/all-tasks', passport.authenticate('jwt', { session: false }), TaskController.fetchDataTasksAll);

router.post('/board/:name_board', passport.authenticate('jwt', { session: false }), upload, TaskController.postActions);
router.post('/boards', passport.authenticate('jwt', { session: false }), boardController.addBoard);

router.put('/boards', passport.authenticate('jwt', { session: false }), UserController.updateDataUser);
router.put('/board/:name_board', passport.authenticate('jwt', { session: false }), TaskController.putActions);
router.put('/all-tasks', passport.authenticate('jwt', { session: false }), UserController.updateDataUser);

router.delete('/board/:name_board', passport.authenticate('jwt', { session: false }), TaskController.deleteActions);
router.delete('/boards', passport.authenticate('jwt', { session: false }), boardController.deleteBoard);

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);


module.exports = router;
