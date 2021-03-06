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
            username : req.session.username
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
        res.send(err)
    })
})

route.get('/:postId', (req, res)=> {
    let dataPost = null
    let dataComment = null
        Post.findByPk(req.params.postId, {
            include: {
                model : PostCat,
                include : {
                    model : Category
                }
            }
        })
    .then((post) => {
        dataPost = post
         Comment.findAll({
            where : {PostId : post.id}
            
        })
        .then((gotComment)=> {
            dataComment = gotComment
            return User.findOne({
                where : {username : req.session.username}
            })
            
        })
        .then((user)=> {
            res.render('singlePost.ejs',{
                    data : dataPost,
                    comment : dataComment,
                    userlogin : user.username
                })
        })
        // res.render('singlePost.ejs',{
        //     data : post,
        //     userlogin : req.session.username
        // })
    })
    .catch((err)=> {
        res.send(err)
    })
})

route.post('/:postId/addComment', (req, res)=> {
    let dataPost = null
    Post.findByPk(req.params.postId)
    .then((post)=> {
        // res.send(post)
        dataPost = post
        return User.findOne({
            where: {
                username : req.session.username
            }
        })
    })
    .then((user)=> {
        // res.send(user)
       return Comment.create({
            UserId: user.id,
            PostId: dataPost.id,
            content: req.body.content
        })
    })
    .then(success => {
        res.redirect(`/post/${success.PostId}`)
    })
    .catch((err)=> {
        res.send(err)
    })
})


module.exports = route