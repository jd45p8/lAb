var express = require('express'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
    
module.exports = function(app, passport){
    app.get('/addCajer@',function(req,res){
        res.render('addUser',{
            title : 'lAb| Añadir Cajer@',
            user: req.user
        });
    });
    
    /*
    app.post('/addUser', passport.authenticate('local-signup',{
        successRedirect: '/addUser',
        failureRedirect: '/home',
        failureFlash : true
    })); 
    */
    
    app.post('/addCajer@', function(req, res){
        User.findOne({'local.email': req.body.email}, function(err, user){   
            if(err)                 
                return done(err);

            if(user){
                req.flash('error', 'El email ya existe');
                res.redirect('back')
            }else{
                
                User.findOne({'local.cedula': req.body.cedula}, function(err, user){
                    if(err)                 
                    return done(err);
                    
                    if(user){
                        req.flash('error','La cedula ya existe');
                        res.redirect('back')
                    }else{
                        var newUser = new User();
                        newUser.local.email = req.body.email;
                        newUser.local.password = newUser.generateHash(req.body.password);
                        newUser.local.name.nombres = req.body.first_name;
                        newUser.local.name.apellidos = req.body.last_name;
                        newUser.local.cedula = req.body.cedula;
                        newUser.local.direccion = req.body.direccion;
                        newUser.local.cellphone = req.body.celular;
                        newUser.local.cargo = 'cajer@';

                        newUser.save(function(err){
                            if(err)
                                req.flash('error', 'Ha ocurrido un error interno.');
                            else    
                                req.flash('exito', 'Cajero añadido exitosamente.');
                            res.redirect('back');
                        });
                    }
                
                });                
            }
        });

    });
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated)
        return next();
    res.redirect('/login');
}