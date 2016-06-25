exports.models = {
		"Event":{
			"id":"Event",
			"required": ["id", "fullname", "password"],
			"properties":{
				"id":{
					"type":"string",
					"description": "Unique identifier for the event"
				},
				"title":{
					"type":"string",
					"description": "Title of the event"
				},
				"description":{
					"type":"string",
					"description": "Brief description about the event"
				},
				"gpsLocation":{
					"type":"GPSLocation",
					"description": "Location of the event"
				},
				"address":{
					"type":"string",
					"description": "Address of the event"
				},
				"country":{
					"type":"string",
					"description": "Country of the event"
				},
				"participantAmount":{
			          "type":"string",
			          "description": "Type of user (civilian, worker, etc)",
					  "default": "0-10",
			            "enum": [
			              "0-10",
			              "11-50",
			              "51-100",
			              "100+"
			            ]
		        },
		        "knownParticipants":{
					"type":"boolean",
					"description": "True/False: Is the user available?"
				},
		        "startTime":{
					"type":"boolean",
					"description": "True/False: Is the user available?"
				},
		        "duration":{
					"type":"integer",
					"description": "duration of the events in minutes"
				},
		        "addedTime":{
					"type":"dateTime",
					"description": "date/time of the addition"
				},
		        "addedBy":{
					"type":"boolean",
					"description": "True/False: Is the user available?"
				},
		        "status":{
					"type":"boolean",
					"description": "True/False: Is the user available?"
				}
			}
		},
		"GPSLocation":{
			"id":"GPSLocation",
			"required": ["latitude", "longitude"],
			"properties":{
				"latitude":{
					"type":"string",
					"description": "Latitude"
				},
				"longitude":{
					"type":"string",
					"description": "Longitude"
				}
			}
		},
		"User":{
			"id":"User",
			"required": ["userid"],
			"properties":{
				"id":{
					"type":"string",
					"description": "Unique identifier for the event"
				},
				"displayName":{
					"type":"string",
					"description": "Display name of the user"
				}
			}
		},
		"UserTracking":{
			"id":"UserTracking",
			"required": ["userid"],
			"properties":{
				"userid":{
					"type":"string",
					"description": "identifier for the user"
				},
				"location":{
					"type":"GPSLocation",
					"description": "Location of the user"
				},
				"ts":{
					"type":"dateTime",
					"description": "date/time of the track"
				}
			}
		}
}
