const express = require('express')
const app = express()
const port =  process.env.PORT || 1337;
const session = require('express-session')

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/', require('./routes/allPostRoutes'))
app.use('/post', require('./routes/postRoutes'))
app.use('/logout', require('./routes/logoutRoutes'))
app.use('/login', require('./routes/loginRoutes'))
app.use('/register', require('./routes/registerRoutes'))
app.use('/profile', require('./routes/profileRoutes'))
app.use('/category', require('./routes/categoryRoutes'))
app.use('/validate', require('./routes/validateRoutes'))

 
app.listen(port, () => {
    console.log('this app running on port ' + port)
})