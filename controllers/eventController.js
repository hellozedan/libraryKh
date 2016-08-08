/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Book = require('../models/book.js');
var Event = require('../models/event.js');

var eventController = function (Event) {

    var post = function (req, res) {
        var newEvent = req.body;
        var event = new Event(newEvent);
        var editEvent;

        if(!newEvent._id) {
            event.save(function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(event);
                }
            });

        }
        else{

            editEvent=Event.find({_id:newEvent._id});
            editEvent.update(newEvent,function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(newEvent);
                }
            });

        }


    }



    var get = function (req, res) {
        var query = {};

        Event.find(query).sort({'_id': 'descending'}).exec( function (err, events) {
            if (err) {
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.status(200).send(events);
            }
        });

    }


    var deleteIt = function (req, res) {

        var idForDelete = req.headers['event_id'];
        var deleteEvent;

        deleteEvent={_id:idForDelete};


        Event.remove(deleteEvent,function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send("deleted");
            }
        })};

    return {
        post: post,
        get: get,
        deleteIt:deleteIt

    };

};



module.exports = eventController;