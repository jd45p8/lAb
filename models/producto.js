var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    id : String,
    name : String,
    valor : {
        type : Number,
        trim : true
    }
    
});

mongoose.model('Producto', ProductSchema);