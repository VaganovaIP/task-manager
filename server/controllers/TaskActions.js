const ListController = require("./ListController");
const AssigmentController = require("./AssignmentController");
const MemberController = require("./MemberController");
const FilesTaskController = require("./FilesTaskController");
const BoardController = require("./BoardController");
const UserController = require("./UserController");
const AssignmentController = require("./AssignmentController");
const TaskController = require("./TaskController");

class TaskActions {
    static async getActions(req, res){
        const { type } = req.query;
        console.log(type)
        //

        switch (type) {
            case "data":
                await TaskController.fetchDataTasks(req, res);
                break;
            case "download":
                await FilesTaskController.downloadFile(req, res);
                break;
        }

    }

    static async postActions(req, res){
        const {formName} = req.body;
        console.log(formName)
        switch (formName){
            case "form-add-list":
                await ListController.createList(req, res);
                break;
            case "form-add-task":
                await TaskController.createTask(req, res);
                break;
            case "form-add-assignments":
                await AssigmentController.addAssignments(req, res);
                break;
            case "form-add-members":
                await MemberController.addMemberBoard(req, res);
                break;
            case "form-upload-file":
                await FilesTaskController.uploadFile(req, res);
                break;
        }
    }

    static async putActions(req, res){
        const {formName} = req.body;
        switch (formName) {
            case "form-update-board":
                await BoardController.updateNameBoard(req, res);
                break;
            case "form-update-list":
                await ListController.updateNameList(req, res);
                break;
            case "form-save-task":
                await TaskController.saveTask(req, res);
                break;
            case "form-update-user":
                await UserController.updateDataUser(req, res);
                break;
        }
    }

    static async deleteActions(req, res) {
        const {formName} = req.body;
        switch (formName) {
            case "form-delete-assignment":
                await AssignmentController.deleteAssignmentTask(req, res);
                break;
            case "form-delete-member":
                await MemberController.deleteMemberBoard(req, res);
                break;
            case "form-delete-task":
                await TaskController.deleteTask(req, res);
                break;
            case "form-delete-list":
                await ListController.deleteListBoard(req, res);
                break;
        }
    }

}

module.exports = TaskActions