/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var eventModel = new Schema({
	"name": {
		type: String,
		description: "name of the event"
	},

	"description": {
		type: String,
		description: "Brief description about the book"
	},
	"time": {
		type: String,
		description: "time -Hour of the event"
	}, "date": {
		type: String,
		description: "date of the event"
	}
});

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('Event', eventModel);