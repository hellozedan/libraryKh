/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var languageModel = new Schema({
/*	"code": {
		type: String,
		description: "code of the Language"
	},*/
	"name": {
		type: String,
		description: "name of the Language"
	}

});

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('Language', languageModel);