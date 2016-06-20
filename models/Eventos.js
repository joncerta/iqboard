var mongoose = require('mongoose');

var EventoSchema = new mongoose.Schema({
	date: String,
  activity: String,
  responsable: String,
  assistants: {
    name: String,
    cargo: String,
    position: String,
    email: String,
    tel: String
  },
  observations: String,
  activities: {
    description: String,
    dateAct: String,
    responsableAct: String,
    dateFinished: String,
    ok: Boolean,
    discarded: Boolean
  },
  cliente:{
    type: mongoose.Schema.Types.ObjectId, ref: 'Cliente'
  }
});

mongoose.model('Eventos', EventoSchema);