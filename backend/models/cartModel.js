'use strict';

var mongoose = require('mongoose');

var cartModel = function() {
	var cartSchema = mongoose.Schema({
        book_id: String,
        title: String,
		count: Number,
		price: Number,
	});

	return mongoose.model('Cart', cartSchema);
}


module.exports = new cartModel();