const route = require('express').Router()
const Model = require('../models')

route.get('/', (req, res)=> {
    res.send('post')
})

route.get('/add', (req, res)=>{
    res.render('post.ejs')
})

route.post('/add', (req, res)=> {
    res.send(req.body)
})

module.exports = route