var express = require('express'),
    mongoose = require('mongoose'),
    Producto = mongoose.model('Factura');

module.exports = function(app, passport){
    app.post('/addFactura', isLoggedIn, function(req, res){
        
    });
}


function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    req.flash('error','No ha iniciado sesión');
    res.redirect('/login');
}