var express = require('express');

module.exports = function(app, passport){
    app.get('/addUser',function(req,res){
        res.render('addUser',{
            user: req.user
        });
    });
    
    app.post('/addUser', passport.authenticate('local-signup',{
        successRedirect: '/addUser',
        failureRedirect: '/home',
        failureFlash : true
    })); 
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated)
        return next();
    res.redirect('/login');
}