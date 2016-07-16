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
        var editRoom;


        if(!newRoom._id) {

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
        else{

            editRoom=Room.find({_id:newRoom._id});
            editRoom.update(newRoom,function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(newRoom);
                }
            });
        }


    }











    var get = function (req, res) {
        var query = {};

        Room.find(query).sort({'_id': 'descending'}).exec(query, function (err, rooms) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(rooms);
            }
        });

    }


    var deleteIt = function (req, res) {

        var idForDelete = req.headers['room_id'];
        var deleteRoom;

        deleteRoom={_id:idForDelete};


        Room.remove(deleteRoom,function (e) {
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



module.exports = roomController;