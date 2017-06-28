var express = require('express'),
    mongoose = require('mongoose'),
    Producto = mongoose.model('Producto');

module.exports = function(app, passport){
    app.get('/addProducto', function(req, res){
        res.render('addProducto', {
            user : req.user
        });        
    });
    
    app.get('/viewProductos', function(req,res){
        res.render('viewProductos',{
            user : req.user
        });    
    });
    
    app.post('/addProducto', function(req, res){
        Producto.findOne({'name' : req.body.product_name}, function(err, producto){
            if(producto)
                res.redirect('/addProducto', req.flash('error', 'Ya existe un producto con ese nombre.'));
        });
        
        Producto.findOne({'id' : req.body.code}, function(err, producto){
            if(producto)
                res.redirect('/addProducto', req.flash('error', 'Ya existe un producto con ese id.'));
        });
        
        
        var newProducto = new Producto();
        
        newProducto.name = req.body.product_name;
        newProducto.id = req.body.code;
        newProducto.valor = req.body.valor;
        
        newProducto.save(function(err){
            if(err)
                throw(err);
            res.redirect('/addProducto', req.flash('exito', 'Producto añadido exitosamente.'));
        });
        
    });
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}