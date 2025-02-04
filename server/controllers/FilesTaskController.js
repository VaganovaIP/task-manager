const path = require("path");
const fs = require("fs");
const FileTask = require("../models/FileTask");
const { v4: uuidv4 } = require("uuid");

class FilesTaskController {
    static async uploadFile(req, res){
        const {fileId, task_id, file_name} = req.body;

        if (!req.file) {
            return res.status(400).send('Файл не был загружен.');
        }

        await FileTask.create({file_id: fileId, task_id: task_id, name_file: file_name})
            .then(res.send('Файл успешно загружен.'))
            .catch((err) => {console.log(err)})

    }

    static async downloadFile(req, res){
        const task_id = req.headers['task_id'];
        const file_name = decodeURI(req.headers['file_name']);
        const fileP = path.join(__dirname, "../uploads/", task_id, '/');

        try {
            fs.createReadStream(fileP + file_name).pipe(res);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Download error"})
        }
    }

    static async fetchDataFilesTasks(req, res){
        const task_id = req.query.task_id;
         try{
            let files = await FileTask.findAll({
                    where:{
                        task_id:task_id
                    }
                }
            )
            await res.status(200).json({files:files})
        } catch (err){
            console.log(err)
        }
    }

    static async deleteFile(req, res){
        const {file_id, task_id, file_name} = req.body;
        console.log(file_id)
        await FileTask.destroy({
            where:{
                file_id:file_id,
            }
        })
            .then(res.status(200).send({message: 'Delete file'}))
            .catch((err) => {console.log(err)})

        const fileP = path.join(__dirname, "../uploads/", task_id, file_name);
        try {
            fs.unlinkSync(fileP);
            console.log('Deleted file');
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = FilesTaskController;