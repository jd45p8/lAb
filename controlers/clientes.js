var express = require('express');

module.exports = function(app, passport){
    app.get('/addCliente', function(req, res){
        res.render('addCliente',{
            title : 'lAb| Añadir cliente',
            user : req.user            
        });
    });
    
    app.get('/viewClientes', function(req,res){
       res.render('viewClientes',{
           title : 'lAb| Ver clientes',
           user : req.user
       }); 
    });
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}