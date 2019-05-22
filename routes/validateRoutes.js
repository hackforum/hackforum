const route = require('express').Router()
const Model = require('../models')
const User = Model.User

 
 
route.get('/',(req,res) => {
    res.render('validateEmail.ejs',{
        err : req.query.errMsg
    })
})


route.post('/',(req,res)=>{
    User.findOne({
        where : {token: req.body.token}
    })
    .then((gotData)=>{
        if(gotData){
            gotData.status = true
            return gotData.save()
        } else {
            throw Error("Token Not Found!")
        }
    })
    .then(()=>{
        res.redirect('/')
    })
    .catch((err) => {
        res.redirect(`/validate?errMsg=` + err.message)
    })
})




 
module.exports = route