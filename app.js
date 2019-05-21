const express = require('express')
const app = express()
const port = 3333
const landingRoutes = require('./routes/landingRoutes')
const registerRoutes = require('./routes/registerRoutes')
const profileRoutes = require('./routes/profileRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
app.use(express.urlencoded({ extended: false }));
 

app.use('/', landingRoutes)
app.use('/register', registerRoutes)
app.use('/profile', profileRoutes)
app.use('/category', categoryRoutes)

 
app.listen(port, () => {
    console.log('this app running on port ' + port)
})