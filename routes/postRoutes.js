const route = require('express').Router()
const User = require('../models').User
const Category = require('../models').Category
const Post = require('../models').Post
const PostCat = require('../models').PostCat

route.get('/', (req, res)=> {
    Post.findAll({
        include: [User]
    })
    .then((data)=> {
        res.send(data)
    })
})

route.get('/add',(req, res)=>{
    let user = null
    User.findOne({
        where : {
            username: 'novitarkhmwt'
            // username : req.session.username
        }
    })
    .then((dataUser) => {
        if(!dataUser){
            res.redirect('/login')
        }else{
            user = dataUser
            return Category.findAll()
        }
    })
    .then((dataTag)=> {
        res.render('post.ejs', {
            dataUser : user,
            tags : dataTag 
        })
    })
    .catch((err)=> {
        res.send(err)
    })
})

route.post('/add', (req, res)=> {
    User.findOne({
        where : {
            username : 'novitarkhmwt'
        }
    })
    .then((dataUser)=> {
        return Post.create({
            title : req.body.title,
            content : req.body.content,
            UserId : dataUser.id
        })
    })
    .then((dataPost) => {
        for(let i = 0; i < req.body.tagId.length; i++){
            PostCat.create({
                PostId : dataPost.id,
                CategoryId : req.body.tagId[i]
            })
        }
    })
    .then(success => {
        res.redirect('/')
    })
    .catch((err)=> {
        req.send(err)
    })
})

module.exports = route