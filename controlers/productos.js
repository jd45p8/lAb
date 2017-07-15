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
                req.flash('error', 'Ha ocurrido un error.');
                res.redirect('back');
            }
                
            if(producto){
                req.flash('error', 'Ya existe un producto con ese nombre.');
            }else{
                Producto.findOne({'id' : req.body.code}, function(err, producto2){
                    if(err){
                        req.flash('error', 'Ha ocurrido un error.');
                        res.redirect('back');
                    }

                    if(producto2){
                        req.flash('error', 'Ya existe un producto con ese id.'); 
                    }else{
                        var newProducto = new Producto();
                        
                        newProducto.name = req.body.product_name;
                        newProducto.id = req.body.code;
                        newProducto.valor = req.body.valor;

                        newProducto.save(function(err){
                            if(err)
                                req.flash('error', 'Ha ocurrido un error.');
                            else
                                req.flash('exito', 'Producto añadido exitosamente.');                            
                        });
                    }
                });
            }
            res.redirect('back');
        });
    });  
    
    app.post('/deleteProducto',isLoggedIn, function(req,res){
        var urlBack = '/viewProductos'; 
        Producto.remove({'id': req.body.code},function(err, producto){
            if(err){
                req.flash('error', 'Ha ocurrido un error.');  
                res.redirect('back');
            }
            
            if(producto)              
                req.flash('exito', 'Se ha eliminado el producto ' + producto.id + 'con exito.');    
            else
                req.flash('error', 'Producto no encontrado.');                
            res.redirect('back');            
        });
    });
    
    app.post('/updateProducto', isLoggedIn, function(req,res){
        
        Producto.findOne({'name' : req.body.product_name}, function(err, producto){
            if(err){
                req.flash('error', 'Ha ocurrido un error.')
                res.redirect('back');
            }

            if((producto) && (producto.id != req.body.code)){
                req.flash('error', 'Ya existe un producto con ese nombre.');                                
            }else{
                Producto.findOne({'id': req.body.code}, function(err, producto2){
                    if(err){
                        req.flash('error', 'Ha ocurrido un error.');  
                        res.redirect('back');  
                    }

                    if(producto2){    
                        producto2.name = req.body.product_name;
                        producto2.valor = req.body.valor;

                        producto2.save(function(err){
                            if(err){
                                req.flash('error', 'Ha ocurrido un error.');  
                                res.redirect('back');
                            }
                            req.flash('exito', 'Se ha actualizado el producto ' + producto2.id + 'con exito.');   
                        });
                    }
                    else{
                        req.flash('error', 'No se ha encontrado el producto.');
                    } 
                });
            }
            res.redirect('back'); 
        });       
        
    });
    
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    req.flash('error','No ha iniciado sesión');
    res.redirect('/login');
}