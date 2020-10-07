const mongoose = require('mongoose');

let schema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amigo: {
    type: Number,
    required: false,
  },
});

const Pessoa = mongoose.model('Pessoa', schema);

module.exports = Pessoa;