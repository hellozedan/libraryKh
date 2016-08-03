/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var authorModel = new Schema({
	/*"code": {
		type: String,
		description: "code of the author"
	},*/
	"name": {
		type: String,
		description: "name of the author"
	}

});

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('Author', authorModel);