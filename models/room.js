/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var roomModel = new Schema({
	"code": {
		type: String,
		description: "code of the room"
	},
	"name": {
		type: String,
		description: "name of the room"
	},
	"description": {
		type: String,
		description: "description of the room"
	},
	"status": {
		type: String,
		description: "status of the room"
	}
});

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('Room', roomModel);