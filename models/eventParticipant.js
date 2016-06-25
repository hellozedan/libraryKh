/**
 * Created by Joe on 06/06/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventParticipantModel = new Schema({
	"event":
	{
		type: Schema.Types.ObjectId, 
		ref: 'Event',
		"description": "event...",
	},
	"user":
	{
		type: Schema.Types.ObjectId, 
		ref: 'User',
		"description": "patricipating user",
	},
	"comment":{
        type:String,
        description: "Address of the event"
    },
	"visibility":{
        type:String,
        description: "visibility of the event",
        default: "public",
        enum: [
            "public",
            "private",
            "internal"
        ]
    },
    "visibleTime":{
    	type: Date,
        default: Date.now,
        description: "Timestamp of the visible time"
    },
    "status":{
        type:String,
        description: "participant status in the the event",
        default: "available",
        enum: [
            "available",
            "busy",
            "inameeting"
        ]
    },
});

module.exports= mongoose.model('EventParticipant', eventParticipantModel);