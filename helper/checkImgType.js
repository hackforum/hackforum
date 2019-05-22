function checkImgType(file, cb){
    const path = require('path')
    const fileType = /jpeg|jpg|png/
    const extname = fileType.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileType.test(file.mimetype) 
    if(mimetype && extname){
        return cb(null, true)
    } else {
        cb('Images Only !')
    }
}


module.exports = checkImgType 