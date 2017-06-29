var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    local: {
        name: {
            nombres: String,
            apellidos: String
        },
        cedula: {
            type: Number,
            trim: true
        },
        direccion: {
            type: String
        },
        email: {
            type: String,
            lowercase: true,
            trim: true
        },
        password: {
            type: String  
        },
        celphone: {
            type: Number,
            trim: true
        },
        cargo: {
           type: String,
           enum: ['cajer@', 'admin']
        }        
    }
    
});

//Generate a hash
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Check if password is valid
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
}

mongoose.model('User', UserSchema);