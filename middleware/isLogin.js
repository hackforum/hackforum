module.exports.isLogin = function (req, res, next){
    User.findOne({
        where : {
            username : req.session.username
        }
    })
    .then((dataUser) => {
        if(!dataUser){
            res.redirect('/login')
        }else{
            return next()
        }
    })
}