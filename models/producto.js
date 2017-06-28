var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    id : String,
    name : String,
    valor : {
        type : String,
        trim : true
    }
    
});

mongoose.model('Producto', ProductSchema);