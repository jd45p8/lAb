var express = require('express'),
    mongoose = require('mongoose'),
    Producto = mongoose.model('Producto');

module.exports = function(app, passport){
    app.get('/addProducto', isLoggedIn, function(req, res){
        res.render('addProducto', {
            title : 'lAb| Añadir productos',
            user : req.user
        });        
    });
    
    app.get('/viewProductos', isLoggedIn, function(req,res){
        Producto.find({},function(err, productos){
            if(err){
                req.flash('error', 'Ha ocurrido un error.');
                res.redirect('back'); 
            }
                
            res.render('viewProductos',{
                title : 'lAb| Ver productos',
                user : req.user,
                productos : productos
            });  
        });
          
    });
    
    app.post('/addProducto', isLoggedIn, function(req, res){
        Producto.findOne({'name' : req.body.product_name}, function(err, producto){
            if(err){
                req.flash('error', 'Ha ocurrido un error.')
                res.redirect('back');
            }
                
            if(producto){
                req.flash('error', 'Ya existe un producto con ese nombre.')
                res.redirect('back');
            }
        });
        
        Producto.findOne({'id' : req.body.code}, function(err, producto){
            if(err){
                req.flash('error', 'Ha ocurrido un error.')
                res.redirect('back');
            }
            
            if(producto){
                req.flash('error', 'Ya existe un producto con ese id.')
                res.redirect('back');
            }
        });
        
        
        var newProducto = new Producto();
        
        newProducto.name = req.body.product_name;
        newProducto.id = req.body.code;
        newProducto.valor = req.body.valor;
        
        newProducto.save(function(err){
            if(err)
                req.flash('error', 'Ha ocurrido un error.')
            else
                req.flash('exito', 'Producto añadido exitosamente.')
            res.redirect('back');
        });
        
    });    
    
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}