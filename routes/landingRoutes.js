const route = require('express').Router()
const Model = require('../models')
 
 
route.get('/',(req,res) => {
res.render('landing.ejs')
})
 
module.exports = route