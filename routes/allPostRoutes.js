const route = require('express').Router()
const Model = require('../models')
const Post = Model.Post
const User = Model.User
 
 

// route.get('/',(req,res)=>{
//     res.render("allPost.ejs")
// })
route.get('/',(req,res) => {
    console.log(req.session.username);
    
    Post.findAll({
        include : [{model : User}]
    })
    .then(gotAllData => {
        // res.send(gotAllData)
        res.render('allPost.ejs',{
            data : gotAllData,
            userlogin : req.session.username
        })
    })
    .catch(err => {
        res.send(err)
    })
})
 
module.exports = route