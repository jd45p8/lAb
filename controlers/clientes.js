var express = require('express');

module.exports = function(app, passport){
    app.get('/addCliente', function(req, res){
        res.render('addCliente',{
            user : req.user
        });
    });
    
    app.get('/viewClientes', function(res,res){
       res.render('viewClientes',{
           user : req.user
       }); 
    });
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}