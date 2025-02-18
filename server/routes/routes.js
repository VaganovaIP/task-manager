const express = require('express');
const BoardController = require('../controllers/BoardController');
const TaskController = require('../controllers/TaskController');
const AuthController = require('../controllers/AuthController');
const MemberController = require("../controllers/MemberController");
const ListController = require("../controllers/ListController");
const AssignmentController = require("../controllers/AssignmentController");
const FilesTaskController = require("../controllers/FilesTaskController");
const UserController = require("../controllers/UserController");
const multer = require("multer");
const passport = require("passport");
const path = require("path");
const fs = require("fs");


const router = express.Router();
const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        const task_id = req.headers['task-id'];
        const taskDir = path.join(__dirname, '../uploads', task_id);
        if (!fs.existsSync(taskDir)) fs.mkdirSync(taskDir, { recursive: true });
        cb(null, taskDir);
    },
    filename: (req, file, cb) =>{
        const originalName = Buffer.from(
            file.originalname, 'latin1').toString('utf-8');
        cb(null, originalName);
    }
});

const upload = multer({storage:storageConfig}).single("file");

router.get('/boards', passport.authenticate('jwt', { session: false }), BoardController.fetchDataBoards);
router.get('/board/:name_board/task', passport.authenticate('jwt', { session: false }), TaskController.fetchDataTasks);
router.get('/board/:name_board/files', passport.authenticate('jwt', { session: false }), FilesTaskController.fetchDataFilesTasks);
router.get('/board/:name_board/download', passport.authenticate('jwt', { session: false }), FilesTaskController.downloadFile);
router.get('/all-tasks', passport.authenticate('jwt', { session: false }), TaskController.fetchDataTasksAll);

router.post('/boards', passport.authenticate('jwt', { session: false }), BoardController.addBoard);
router.post('/board/:name_board/add_task', passport.authenticate('jwt', { session: false }),  TaskController.createTask);
router.post('/board/:name_board/add_member', passport.authenticate('jwt', { session: false }),  MemberController.addMemberBoard);
router.post('/board/:name_board/add_list', passport.authenticate('jwt', { session: false }),  ListController.createList);
router.post('/board/:name_board/add_assignment', passport.authenticate('jwt', { session: false }), AssignmentController.addAssignments);
router.post('/board/:name_board/upload_file', passport.authenticate('jwt', { session: false }), upload, FilesTaskController.uploadFile);

router.put('/board/:name_board/update_task', passport.authenticate('jwt', { session: false }), TaskController.saveTask);
router.put('/board/:name_board/update_board', passport.authenticate('jwt', { session: false }), BoardController.updateNameBoard);
router.put('/board/:name_board/update_list', passport.authenticate('jwt', { session: false }), ListController.updateNameList);
router.put('/boards', passport.authenticate('jwt', { session: false }), UserController.updateDataUser);
router.put('/board/:name_board', passport.authenticate('jwt', { session: false }), UserController.updateDataUser);
router.put('/all-tasks', passport.authenticate('jwt', { session: false }), UserController.updateDataUser);

router.delete('/board/:name_board/delete_list', passport.authenticate('jwt', { session: false }), ListController.deleteListBoard);
router.delete('/board/:name_board/delete_task', passport.authenticate('jwt', { session: false }), TaskController.deleteTask);
router.delete('/board/:name_board/delete_member', passport.authenticate('jwt', { session: false }), MemberController.deleteMemberBoard);
router.delete('/board/:name_board/delete_assignment', passport.authenticate('jwt', { session: false }), AssignmentController.deleteAssignmentTask);
router.delete('/board/:name_board/delete_file', passport.authenticate('jwt', { session: false }), FilesTaskController.deleteFile);
router.delete('/boards', passport.authenticate('jwt', { session: false }), BoardController.deleteBoard);

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);

module.exports = router;
