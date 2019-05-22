const route = require('express').Router()
const Model = require('../models')
const User = Model.User
const multer = require('multer')
const path = require('path')
const checkImgType = require('../helper/checkImgType')
const Users = Model.Users
const storage = multer.diskStorage({
    destination : './public/userProfile',
    filename : function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage : storage,
    limits : {fileSize: 1000000},
    fileFilter : function(req,file,cb){
        checkImgType(file, cb)
    }
}).single('userProfile')
 
route.get('/',(req,res)=>{
    // let gotId = req.params.id
    User.findOne({
        where : {username : "friskazahria"}
    })
    .then((gotData)=>{
        // res.send(gotData)
        res.render('profile.ejs',{
            data : gotData
        })
    })
    .catch((err) => {
        res.send(err)
    })
})

route.post('/edit',(req,res)=>{
    
    upload(req,res, (err) => {
                User.findOne({
                    where : {username : "friskazahria"}
                })
                .then((gotData)=>{
                    gotData.firstName = req.body.firsName,
                    gotData.lastName = req.body.lastName
                    gotData.password = req.body.password,
                    gotData.avatar = `userProfile/${req.file.filename}`
                    return gotData.save()
                })
                .then(()=>{
                    res.redirect('/profile')
                })
                .catch((err) => {
                    res.send(err)
                })
        
    })

})
 
module.exports = route