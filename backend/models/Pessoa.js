const mongoose = require('mongoose');

let subSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

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
    type: subSchema,
    required: false,
  },
});

const Pessoa = mongoose.model('Pessoa', schema);

module.exports = Pessoa;