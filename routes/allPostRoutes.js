const route = require('express').Router()
const Model = require('../models')
 
 
route.get('/',(req,res) => {
res.render('allPost.ejs')
})
 
module.exports = route