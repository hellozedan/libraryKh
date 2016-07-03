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
    var get = function (req, res) {
        var query = {};

        Event.find(query, function (err, events) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(events);
            }
        });

    }


    return {
        post: post,
        get: get
    };

};



module.exports = eventController;