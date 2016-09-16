/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var personModel = new Schema({
	"id": {
		type: String,
		description: "id of the person"
	},
	"firstName": {
		type: String,
		description: "ffirstName of the person"
	},
	"lastName": {
		type: String,
		description: "lastName of the person"
	},
	"MessagesLength": {
		type: Number,
		default:0,
		description: "lastName of the person"
	},
	"gender": {
		type: String,
		description: "gender of the person"
	},
	"email": {
		type: String,
		description: "email of the person"
	},
	"address": {
		type: String,
		description: "address of the person"
	},
	"birthday": {
		type: String,
		description: "birthday  a of the person"
	},
	"token":{type:String},

	"password": {
	type: String,
		description: "password of the person"
},
	"isAdmin": {
		type: Boolean,
		description: "isAdmin of the personn"
	},
	"roomOrders": {
		orders: [
			{"hour":"","room":"",date:"",status:""}]
	},
	followersArray:{
		type:Array
	}
	/*"messagesArray": {
		type: Array,
		default: []
	/!*	messages: [
			{"subject":"","date":"",from:"",data:"",isRead:""}]*!/
	}
*/
	//when finish delete order from array;
//

});

/*personModel.pre('save',function(next){

	var user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}

});*/

//this will expose the the "bookModel" we defined above under the name "Book" to other JS files to use it under node.js
module.exports = mongoose.model('Person', personModel);