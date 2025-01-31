const path = require("path");
const fs = require("fs");


class FilesTaskController {
    static async uploadFile(req, res, next){
        const {formName} = req.body;
        // console.log(id)
        console.log(formName)
        return !req.file ? res.status(500).send({msg: "file is not found"})
            : res.status(200).send("file upload");
    }

    static async downloadFile(req, res){

        const fileP = path.join(__dirname, "../uploads/");
        const fileName = 'giphy.gif'
        fs.createReadStream(fileP+fileName).pipe(res);
        // res.download(fileP + fileName, (err) => {
        //     if (err) {
        //         console.log(fileP + fileName)
        //     }})

        // try {
        //     if (fs.existsSync(fileP+fileName)) {
        //         return res.download(fileP, fileName)
        //         console.log(fileP + fileName)
        //     }
        //     return res.status(400).json({message: "Download error"})
        // } catch (e) {
        //     console.log(e)
        //     res.status(500).json({message: "Download error"})
        // }
    }

}

module.exports = FilesTaskController;