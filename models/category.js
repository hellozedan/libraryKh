/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var categoryModel = new Schema({
/*	"code": {
		type: String,
		description: "code of the Category"
	},*/
	"name": {
		type: String,
		description: "name of the Category"
	}

});

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('Category', categoryModel);