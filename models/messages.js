/**
 * Created by Kholod on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var messagesModel = new Schema({
	"senderUser":{
		type: String
		// can be system
	},
	"senderUser_ID":{
		type: String

	} ,
	"receiverUser":{
		type: String

	} ,
	"receiverUser_ID":{
		type: String

	} ,
	"senderName":{
		type: String
		// can be system
	},
	"receiverName":{
		type: String

	} ,
	"content":{
		type:String,
		description: "Content of the message"
	},

	"isRead":{
		type:Boolean,
		default: false,
		description: "was read by the receiver?"
	},
	"addedTime":{
		type: Date,
		default: Date.now,
		description: "Timestamp of the addition time and date"
	},

});

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('Messages', messagesModel);