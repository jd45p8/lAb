var express = require('express'),
    mongoose = require('mongoose'),
    Client = mongoose.model('Client');

module.exports = function(app, passport){
    app.get('/addCliente', isLoggedIn, function(req, res){
        res.render('addCliente',{
            title : 'lAb| Añadir cliente',
            user : req.user            
        });
    });
    
    app.post('/addCliente', isLoggedIn, function(req, res){
        Client.findOne({'cedula': req.body.cedula}, function(err, client){
            if(err){
                req.flash('error', 'Ha ocurrido un error.');
                res.redirect('back');
            }
            if(client){
                req.flash('error', 'La cédula ' + req.body.cedula + ' ya está registrada.');
                res.redirect('back');
            }
        });
        
        if(req.body.first_name.length + req.body.last_name.length < 3){
            req.flash('error', 'El nombre debe tener por lo menos 3 letras ' + req.body.first_name + " " + req.body.last_name);
            res.redirect('back');
        }
        else
            if(req.body.celular.length != 10){
                req.flash('error', 'El número celular '+ req.body.celular + ' no posee 10 dígitos.');
                res.redirect('back');
            }
            else{
                
                var newCliente = new Client();
                
                newCliente.email = req.body.email;                
                newCliente.name.nombres = req.body.first_name;
                newCliente.name.apellidos = req.body.last_name;
                newCliente.cedula = req.body.cedula;
                newCliente.direccion = req.body.direccion;
                newCliente.cellphone = req.body.celular;
                newCliente.puntos = '0';
                newCliente.seleccionable = 'false';
                
                newCliente.save(function(err, cliente){
                    if(err)
                        req.flash('error', 'Ha ocurrido un error.');
                    else
                        req.flash('exito', 'Cliente '+ req.body.first_name + 'creado con exito.');                      
                    res.redirect('back');
                });
            }
    });
    
    app.get('/viewClientes', isLoggedIn, function(req, res){
        Client.find({}, function(err, clients){
            if(err){
                req.flash('error', 'Ha ocurrido un error.');
                res.redirect('back'); 
            }
            res.render('viewClientes',{
                title : 'lAb| Ver clientes',
                user : req.user,
                clients : clients            
            }); 
        });
        
    });
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    req.flash('error','No ha iniciado sesión');
    res.redirect('/login');
}