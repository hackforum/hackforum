const route = require('express').Router()
const Model = require('../models')
const User = Model.User
const multer = require('multer')
const path = require('path')
const checkImgType = require('../helper/checkImgType')
const Post = Model.Post
const Comment = Model.Comment
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
    // console.log(req.session);
    let dataUser
    User.findOne({
        where : {username : req.session.username},
        include : [{model : Post}]
    })
    .then((gotData)=>{
       dataUser = gotData
        return Comment.findAll({
            where : {UserId : gotData.id}
        })
    })
    .then((dataComment)=>{
        res.render('profile.ejs',{
            data : dataUser,
            comment : dataComment
        })
    })
    .catch((err) => {
        res.send(err)
    })
})

route.post('/edit',(req,res)=>{
    upload(req,res, (err) => {
        User.findOne({
            where : {username : req.session.username}
        })
        .then((gotData)=>{
            gotData.firstName = req.body.firsName,
            gotData.lastName = req.body.lastName,
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