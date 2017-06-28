var express = require('express')

module.exports = function(app, passport){
    app.get('/home', function(req,res){
       res.render('home', {
           user : req.user
       }); 
    });
    
    app.get('/login', function(req,res){
        res.render('login', {
            user : req.user
        });
    });
    
    app.post('/login', passport.authenticate('local-signup',{
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true
    }));
    
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/login');
    });
    
    //Redirect
    app.get('/', function(req,res){
        res.redirect('/home', {
            user : req.user
        });
    });
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}