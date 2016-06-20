var mongoose = require('mongoose');

var ClienteSchema = new mongoose.Schema({
  tipo: String,
	name: String,
  address: String,
  tel: String,
  numnit: {
    nit: String,
    div: String
  },
  clase: String,
  ciudad: String,
  persona: [{}]
  // eventos:
  //   [{
  //     type: mongoose.Schema.Types.ObjectId, ref: 'Eventos'
  //   }]
});

mongoose.model('Cliente', ClienteSchema);