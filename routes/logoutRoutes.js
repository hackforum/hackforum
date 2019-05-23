const route = require('express').Router()
const Model = require('../models')

const User = Model.User
var bcrypt = require('bcryptjs');

 
 
route.get('/',(req,res) => {
    req.session.destroy();
    res.redirect('/')
})


 
module.exports = route