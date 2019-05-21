const express = require('express')
const app = express()
const port = 3100
const songsRoutes = require('./routes/songsRoutes')
const playlistsRoutes = require('./routes/playlistsRoutes')
app.use(express.urlencoded({ extended: false }));
 
 
app.get('/',(req,res) => {
    res.render('home.ejs')
})
 
app.use('/songs', songsRoutes)
app.use('/playlists',playlistsRoutes)
 
app.listen(port, () => {
    console.log('this app running on port ' + port)
})