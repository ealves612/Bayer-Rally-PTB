
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var Produto = require('./produto')

var userSchema = Schema({
	cpf					: {type: String, maxlength: 11},
	password		: String,
	email				: String,
	fullName		: String,
	vendas			:	[{
		data			: Date,
		cnpjcli		:	String,
		preco			:	mongoose.SchemaTypes.Double,
		produto		: {type: Schema.Types.ObjectId, ref: 'Produto'}
	}]
});

module.exports = mongoose.model('User', userSchema);
