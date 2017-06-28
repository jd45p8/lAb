var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports = function(passport){
    passport.serializeUser(function(user,done){
       done(null, user.id);        
    });
    
    passport.deserializeUser(function(id,done){
       User.findById(id, function(err,user){
           done(err,user);
       });
    });
    
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done){        
        //asynchronus
        process.nextTick(function(){            
            console.log('nextTick has happen');
            User.findOne({'local.email': email}, function(err, user){   
                console.log('All rigth');
                if(err)                 
                    return done(err);
                
                if(user){
                    return done(null, false, req.flash('error','El email ya existe'));
                }else{
                    var newUser = new User();
                    
                    console.log('No exists');
                    
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.name.nombres = req.body.first_name;
                    newUser.local.name.apellidos = req.body.last_name;
                    newUser.local.cedula = req.body.cedula;
                    newUser.local.direccion = req.body.direccion;
                    newUser.local.cellphone = req.body.celular;
                    newUser.local.cargo = 'cajer@';
                    
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        //return done(null, newUser);
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallBack : true
    },function(req, email, password, done){
        User.findOne({'local.email' : email}, function(err, user){
            if(err)
                return done(err);
            
            if(!user)
                return done(null, false, req.flash('error', 'Este usuario no existe.'));
            
            if(!user.validPassword(password))
                return done(null, false, req.flash('error', 'La contraseña no es correcta.'));
            
            return done(null, user);
        });
    }));
};