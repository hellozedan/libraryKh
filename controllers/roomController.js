/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Room = require('../models/room.js');

var roomController = function (Room) {

    var post = function (req, res) {
        var newRoom = req.body;
        var room = new Room(newRoom);
        room.save(function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send(room);
            }
        });
    }
    var get = function (req, res) {
        var query = {};

        Room.find(query, function (err, rooms) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(rooms);
            }
        });

    }


    return {
        post: post,
        get: get
    };

};



module.exports = roomController;