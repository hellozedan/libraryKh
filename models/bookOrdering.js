/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//var Book = require('../models/book.js');


var bookOrderingModel = new Schema({
	/*"orderCode": {
		type:String ,
		description: "code of the BookOrdering"
	},*/
	"bookTitle": {
		type: String,
		description: "book of the BookOrdering"
	},
	"book_ID": {
		type: String,
		description: "book of the BookOrdering"
	},
	"user_ID": {
		type: String,
		description: "book of the BookOrdering"
	},
	"userID": {
		type: String,
		description: "user the BookOrdering"
	},
	 "issueDate": {
		type: String,
		description: "issueDate of the BookOrdering"
	}, "dueDate": {
		type: String,
		description: " dueDate of the BookOrdering"
	}, "finishDate": {
		type: String,
		description: "finishDate of the BookOrdering"
	},
	status: {type: String, enum: ['InProgress', 'OnGoing','Finished','Blocked','Pending']}
});
//    Ordering

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('BookOrdering', bookOrderingModel);