const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname){
            cb(null, "server/");
        }
    },
    filename: (req, file, cb) => {
        cb(null, 'server.jar');
    }
});

const upload = multer({ storage: storage }).single("file",10); 

module.exports = upload;
