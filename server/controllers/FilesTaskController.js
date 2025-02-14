const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");

class FilesTaskController {
    static async uploadFile(req, res){
        const {fileId, task_id, file_name} = req.body;

        if (!req.file) {
            return res.status(400).send('Файл не был загружен.');
        }
        try{
            await db.FileTask.create({file_id: fileId, task_id: task_id, name_file: file_name});
            return res.status(201).send({message:'Файл успешно загружен'});
        } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
    }

    static async downloadFile(req, res){
        const task_id = req.headers['task_id'];
        const file_name = decodeURI(req.headers['file_name']);
        const fileP = path.join(__dirname, "../uploads/", task_id, '/');
        try {
            fs.createReadStream(fileP + file_name).pipe(res);
        } catch (err) {
            res.status(500).json({message: "Download error"})
        }
    }

    static async fetchDataFilesTasks(req, res){
        const task_id = req.query.task_id;
        if(!task_id) return res.status(400).send({ message: 'Data not found'})
         try{
            let files = await db.FileTask.findAll({
                    where:{task_id:task_id}
                }
            )
            return res.status(200).json({files:files})
        } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
    }

    static async deleteFile(req, res){
        const {file_id, task_id, file_name} = req.body;
        await db.FileTask.destroy({
            where:{ file_id:file_id}
        })
            .then(res.status(204).send({message: 'Delete file'}))
            .catch((err) => {console.log(err)})

        const fileP = path.join(__dirname, "../uploads/", task_id, file_name);
        try {
            fs.unlinkSync(fileP);
            console.log('Deleted file');
        } catch (err) {console.log(err)}
    }

}

module.exports = FilesTaskController;