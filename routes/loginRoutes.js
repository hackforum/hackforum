const route = require('express').Router()
const Model = require('../models')

const User = Model.User
var bcrypt = require('bcryptjs');

 
route.get('/',(req,res) => {
    req.session.username = false
    res.render('landing.ejs',{
        err : req.query.errMsg       
    })
})

route.post('/',(req,res)=>{
    
    
    User.findOne({
        where : {username: req.body.username}
    })
    .then((gotData)=>{
        
        
        if(gotData){
            // res.send(gotData);
            
            if(gotData.status === true){
                
                // var salt = bcrypt.genSaltSync(10);
                // var hash = bcrypt.hashSync(req.body.password, salt);
                if(bcrypt.compareSync(req.body.password, gotData.password)){
                    req.session.username = gotData.username
                    // console.log(req.session)
                    res.redirect('/profile')
                } else {
                    throw Error("Password Not Match")
                }
            } else {
                throw Error("Verify Your Account First !")    
            }
        } else {
            throw Error("Username Not Found")
        }
    })
    .catch((err) => {
        res.redirect(`/login?errMsg=` + err.message)
    })
})
 
module.exports = route