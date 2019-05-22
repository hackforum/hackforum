const route = require('express').Router()
const Model = require('../models')
const User = Model.User
const randomString = require('randomstring')
// const mailer = require('../misc/mailer')
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')

var transporter = nodemailer.createTransport({
    serevice : "gamail",
    auth : {
        xoauth2 : xoauth2.createXOAuth2Generator({
            user : 'dedysimamora627@gmail.com',
            clientdID: '908752446299-jt7rggc7u27l82210v387voleqn54amd.apps.googleusercontent.com',
            clientSecreet: 's6qp1opPZDaUXaQ3j9rU-XMM',
            refreshToken: '1/JfeNGCsr2EfmWYrPTcmBMgHVlbFwEBqa9tflhd_v4IE'
        })
    }
})

let token = randomString.generate()
let emailCont = `
    thank you for join hackForum <br/>
    Please verify your email by typing the following token :<br/>
    Token : <b>${token}</b><br/>
    On The Following Page : <a href="http://localhost:3333/validate">Click Here</a>`

var mailOptions = {
    from : 'HackForum Registration',
    to : 'maslianagustafo@gmail.com',
    subject: 'HackForum Email Verification',
    text : emailCont
}
 
route.get('/',(req,res) => {
    res.render('register.ejs',{
        // error : req.query.errMsg
        err : req.query.errMsg  
    })
})

route.post('/',(req,res)=>{
    transporter.sendMail(mailOptions,(err)=>{
        if(err){
            console.log(err)
        } else {
            
        }
    })


    console.log("Sucsess send Email")
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