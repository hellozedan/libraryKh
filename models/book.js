/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var bookModel = new Schema({
	"title": {
		type: String,
		description: "Title of the book"
	},
	"author": {
		type: String,
		description: "Title of the book"
	},
	"description": {
		type: String,
		description: "Brief description about the book"
	},
	"category": {
		type: String,
		description: "Brief description about the book"
	}, "year": {
		type: String,
		description: "Brief description about the book"
	}, "language": {
		type: String,
		description: "Brief description about the book"
	}, "user": {
		type: String,
		description: "Brief description about the book"
	}
});

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('Book', bookModel);