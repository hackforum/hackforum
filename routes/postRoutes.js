const route = require('express').Router()
const User = require('../models').User
const Tag = require('../models').Tag
const isLogin = require('../')

route.get('/', (req, res)=> {
    res.send('post')
})

route.get('/add/:userId', (req, res)=>{
   
    res.render('post.ejs')
})

route.post('/add/:userId', (req, res)=> {
    res.send(req.body)
})

module.exports = route