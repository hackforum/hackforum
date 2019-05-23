const route = require('express').Router()
const User = require('../models').User
const Category = require('../models').Category
const Post = require('../models').Post

route.get('/', (req, res)=> {
    res.send('post')
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
        // res.send(dataTag)
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
        Post.create({
            title : req.body.title,
            content : req.body.content,
            UserId : dataUser.id
        })
    })
    .then(success => {
        res.send(`sukses`)
    })
    .catch((err)=> {
        req.send(err)
    })
})

module.exports = route