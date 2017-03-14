var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtoSchema = Schema({
  codigo  : Number,
  nome    : String,
  classe  : String,
  pontos  : Number
});

module.exports = mongoose.model('Produto', produtoSchema);
