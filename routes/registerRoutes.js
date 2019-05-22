const route = require('express').Router()
const Model = require('../models')
const User = Model.User
const randomString = require('randomstring')
const nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'hackforum.team@gmail.com',
           pass: 'hacktiv8super'
       }
})



 
route.get('/',(req,res) => {
    res.render('register.ejs',{
        // error : req.query.errMsg
        err : req.query.errMsg  
    })
})

route.post('/',(req,res)=>{

    let token = randomString.generate()
    let emailCont = `
    thank you for join hackForum <br/>
    Please verify your email by typing the following token :<br/>
    Token : <b>${token}</b><br/>
    On The Following Page : <a href="http://localhost:3333/validate">Click Here</a>`

    const mailOptions = {
        from: 'HackForum@admin.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'HackForum Email Verification', // Subject line
        html: emailCont
    };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
        throw new Error(err)
    }
    else {
      console.log(info)
    let createData = {
        firstName : req.body.firstName,
        lastName     : req.body.lastName,
        username : req.body.username,
        email : req.body.email,
        password : req.body.passwd,
        token : token
    }
    User.create(createData)
    .then(()=>{
        res.redirect('/')
    })
    .catch((err)=>{
        // res.send( err.errors[0].message)
        res.redirect('/register?errMsg=' + err.errors[0].message)
        // res.redirect(`/?errMsg=` + err.message)
    })
    }
 });




    
    // const html = `
    // thank you for join hackForum <br/>
    // Please verify your email by typing the following token :<br/>
    // Token : <b>${token}</b><br/>
    // On The Following Page : <a href="http://localhost:3333/validate">Click Here</a>`
    // // res.send(req.body)
    // mailer.sendEmail('hackForum@admin.com', req.body.email, "HackForum Email Verification", html)
    // .then((gotDataEmail)=>{
    //     console.log(gotDataEmail, "<<<<<<<<<<<<<")
    // })
    // .catch((err)=>{
    //     console.log(err,"XXXXXXXXXXXXXXXXX")
    //     res.send(err)
    // })
    
})
 
module.exports = route