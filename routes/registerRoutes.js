const route = require('express').Router()
const Model = require('../models')
const Playlist = Model.Playlists
const Songs = Model.Songs
 
 
route.get('/',(req,res) => {
res.render('register.ejs')
})
 
module.exports = route