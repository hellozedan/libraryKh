/**
 * Created by Joe on 06/06/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
	 "username":{type:String}, //username
    "firstName":{type:String},
    "lastName":{type:String},
    "email":{type:String},
    "password":{type:String},
    "token":{type:String},
    "lastLocationCoords": {
        type: [Number],
        index: "2d"
    } ,
    "type":{
        type:String,
        description: "type of user",
        default: "normal",
        enum: [
            "guest",
            "normal",
            "system"
        ]
    },
    "fbId":{type:String},
    "gender":{type:String},
    "fbPhotoUrl":{type:String},
    "fbToken":{type:String},
    "fbFriends":{type:Schema.Types.Mixed},
    "friends":{type:[Schema.Types.Mixed],ref: 'Friendship' }

});

module.exports= mongoose.model('User', userModel);