var app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const superagent = require('superagent')
var Book = require('../models/bookModel');
var Cart = require('../models/cartModel');

app.get('/books', function(req, res) {

	Book.find({}, function(err, books) {
		if(err) throw err;
		res.send(books);
	});
});

app.get('/sortBooks', function(req, res) {
	console.log(req.query.sort)
	Book.find({}, function(err, books) {
		if(err) throw err;
		res.send(books);
	});
});

app.get('/book', function(req, res) {
	var id = req.query.bookId;

	Book.find({ _id: id }, function(err, book) {
		if(err) throw err;
		
		res.send(book[0]);
	});
});

app.delete('/book', function(req, res) {
	var bookId = req.query.bookId;
	console.log(bookId)

	Book.findByIdAndRemove(bookId, function(err, book) {
		if(err) {
			console.log(err);
			res.send({
				success: false,
				message: "The request was not completed. Book with id " + book._id + " is not successfully deleted"
			});
		} else {
			res.send({
				success: true,
				message: "Book successfully deleted",
				id: book._id
			});
		}
	});
});

app.post('/book', function(req, res) {
	console.log(req.body.isbn)
	var url = 'https://www.googleapis.com/books/v1/volumes?q=+isbn=' + req.body.isbn
	superagent
    .get(url)
    .end(function(err,output){
		books_json = output.body
		try{
			var amount = (books_json.items[0].saleInfo.listPrice.amount)
		}
		catch(err){
			var amount = Math.round(Math.random() * (1000 - 300 + 1) + 300)
		}
		var book = new Book({title: books_json.items[0].volumeInfo.title,
		description:books_json.items[0].volumeInfo.description,
		author:books_json.items[0].volumeInfo.authors[0],
		publisher:books_json.items[0].volumeInfo.publisher,
		category:books_json.items[0].volumeInfo.categories[0],
		price:amount,
		cover:books_json.items[0].volumeInfo.imageLinks.thumbnail});
		book.save(function(err, createdBookObject) {
			if(err) {
				res.send({
					success: false,
					message: "Book not added"
				});
			} else {
				res.send({
					success: true,
					message: "Book successfully added",
					book: createdBookObject
				});
			}
		});
    })
});

app.put('/book', function(req, res) {
	var bookData = req.body.bookData;

	Book.findById(bookData.id, function(err, book) {
		if(err) {
			res.send(err);
		} else {
			book.title = bookData.title;
			book.author = bookData.author;
			book.publisher = bookData.publisher;
			book.price = bookData.price;
			book.description = bookData.description;
			book.category = bookData.category;
			book.cover = bookData.cover;

			book.save(function(err, book) {
				if(err) {
					res.send(err);
				} else {
					res.send({
						success: true,
						message: "Book successfully updated"
					});
				}
			});
		}
	});
});

app.get('/carts', function(req, res) {

	Cart.find({}, function(err, carts) {
		if(err) throw err;

		res.send(carts);
	});
});

app.post('/cart', function(req, res) {
	var cartData = req.body;
	var cart = new Cart(cartData);
	console.log(cart)
	cart.save(function(err, createdCartObject) {
		if(err) {
			res.send({
				success: false,
				message: "Cart not added"
			});
		} else {
			res.send({
				success: true,
				message: "Cart successfully added",
				cart: createdCartObject
			});
		}
	});
});


app.delete('/cart', function(req, res) {
	var cartId = req.query.cartId;
	console.log(cartId)

	Cart.findByIdAndRemove(cartId, function(err, cart) {
		if(err) {
			console.log(err);
			res.send({
				success: false,
				message: "The request was not completed. Cart with id " + cart._id + " is not successfully deleted"
			});
		} else {
			res.send({
				success: true,
				message: "Cart successfully deleted",
				id: cart._id
			});
		}
	});
});


module.exports = app;