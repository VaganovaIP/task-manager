

class FilesTaskController {
    static async uploadFile(req, res, next){
        const {formName} = req.body;
        // console.log(id)
        console.log(formName)
        return !req.file ? res.status(500).send({msg: "file is not found"})
            : res.status(200).send("file upload");
    }
}

module.exports = FilesTaskController;