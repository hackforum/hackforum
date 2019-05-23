const route = require('express').Router()
const User = require('../models').User
const Category = require('../models').Category
const Post = require('../models').Post
const PostCat = require('../models').PostCat
const Comment = require('../models').Comment

route.get('/', (req, res)=> {
    Post.findAll({
        include: [User]
    })
    .then((data)=> {
        res.send(data)
    })
})

route.get('/add',(req, res)=>{
    console.log(req.session.username);
    
    let user = null
    User.findOne({
        where : {
            // username: 'novitarkhmwt'
            username : req.session.username
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

route.get('/:postId', (req, res)=> {
    Promise.all([
        Post.findByPk(req.params.postId, {
            include: [{
                model : PostCat,
                include : [{
                    model : Category
                }]
            }]
        }), 
        Post.findByPk(req.params.postId, {
            include:[{
                model: Comment,
                include : [{
                    model : User
                }]
            }]
        })
    ])
    .then((post) => {
        res.send(post)
    })
})



module.exports = route