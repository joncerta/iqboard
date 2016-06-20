var mongoose = require('mongoose');

var CotizacionSchema = new mongoose.Schema({
  fecha: String,
  consecutivo: {
    anoconse: String,
    numeroconsecutivo: String
  },
  cliente: String,
  numnit: {
    nit: String,
    div: String
  },
  ciudad: String,
  direccion: String,
  contacto: String,
  email: String,
  telefono: {
    cel: String,
    tel: String
  },
  productos: [{}],
  subtotal: String,
  iva: String,
  total: String
});

mongoose.model('Cotizacion', CotizacionSchema);