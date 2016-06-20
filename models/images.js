/**
 * Module dependencies.
 */
var mongoose;
mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Schema definitions */
var schemaName = Schema({
    referencia: {type: String},
    marca: {type: String},
    descripcion: {type: String},
    precioDistribuidor: {type: Number},
    precioIntegrador: {type: Number},
    precioPublico: {type: Number},
    iva: {type: Number},
    image: {                                // <--- nested document (not sub document)
        modificationDate: {type: Date},
        name: {type: String},
        size: {type: Number},
        type: {type: String},
        filename: {type: String}
    },
    modificationDate: {type: Date, "default": Date.now}
});

// Custom validator
schemaName.path('marca').validate(function (val) {
    return (val !== undefined && val !== null && val.length >= 0);
}, 'Invalid marca');

/*
 If collectionName is absent as third argument, than the modelName should always end with an -s.
 Mongoose pluralizes the model name. (This is not documented)
 */
var modelName = "Image";
var collectionName = "images"; // Naming convention is plural.
mongoose.model(modelName, schemaName, collectionName);