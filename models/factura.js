var mongoose = require('mongoose');

var FacturaSchema = new mongoose.Schema({
    cedula: {
        type: Number,
        trim: true
    },
    productos: [{id: String, cant: Number}],
    date: {
        type: Date,
        default: Date.now
    },
    total: String
});

mongoose.model('Factura', FacturaSchema);