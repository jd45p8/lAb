var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
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
    celphone: {
        type: Number,
        trim: true
    },
    puntos: {
        type: Number
    },
    seleccionable: {
        type: Boolean
    }
},{collection:'clientes'});

mongoose.model('Client', ClientSchema);