/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var roomModel = new Schema({
	code: {
		type: String,
		description: "code of the room"
	},
	name: {
		type: String,
		description: "name of the room"
	},
	description: {
		type: String,
		description: "description of the room"
	},
	status: {
		type: String,
		description: "status of the room"
	},
	lastDate:{
		type: Date,
		description: "status of the room"
	},

	Today:{
		date:Date,
		hours:[
		/*	{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},


*/
		],
	},

	Tomorrow:{
		date:Date,
		hours:[
		],
	},

	AfterTomorrow:{
		date:Date,
		hours:[
		/*	{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},
			{"hour":String,"status":Boolean,"user":String},*/
			/*{"hour":8,"status":true,"user":""},
			{"hour":9,"status":true,"user":"'"},
			{"hour":10,"status":true,"user":""},
			{"hour":11,"status":true,"user":""},
			{"hour":12,"status":true,"user":""},
			{"hour":13,"status":true,"user":""},
			{"hour":14,"status":true,"user":""},
			{"hour":15,"status":true,"user":""},
			{"hour":16,"status":true,"user":""},
			{"hour":17,"status":true,"user":""},*/
		],
	},
	/*dates: {
		type: Schema.Types.Mixed,
		description: "status of the room"
	},*/

	/*dates: {
		name:String,
		status: String,
		hours: [

			{"hour":8,"status":true,"user":""},
			{"hour":9,"status":true,"user":"'"},
			{"hour":10,"status":true,"user":""},
			{"hour":11,"status":true,"user":""},
			{"hour":12,"status":true,"user":""},
			{"hour":13,"status":true,"user":""},
			{"hour":14,"status":true,"user":""},
			{"hour":15,"status":true,"user":""},
			{"hour":16,"status":true,"user":""},
			{"hour":17,"status":true,"user":""},

		]
	}*/
});

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('Room', roomModel);