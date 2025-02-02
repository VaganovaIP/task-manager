const path = require("path");
const fs = require("fs");


class FilesTaskController {
    static async uploadFile(req, res, next){
        if (!req.file) {
            return res.status(400).send('Файл не был загружен.');
        }
        res.send('Файл успешно загружен.');
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