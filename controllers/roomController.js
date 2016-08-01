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



   /* var SaveOrder = function (req, res) {
        var orderRoom = req.body;
        var query = {};
        var room=orderRoom.room;
        var date=orderRoom.date;
        var hour=orderRoom.hour;
        var idUser = orderRoom.userID;
        var roomFound={};


        if (room) {
            query.name = new RegExp(room, "i");
        }

        Room.findOne(query).exec(query, function (err, rooms) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                roomFound=rooms;
            }
        });

        query.dates.name = new RegExp("today", "i");

        Room.findOne(query).exec(query, function (err, rooms) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                roomFound=rooms;
            }
        });

        if(!room.dates.name){
            room.dates.push(date);
            room.dates[date]=[
                {"hour":8,"status":true,"user":idUser},
                {"hour":9,"status":true,"user":idUser},
                {"hour":10,"status":true,"user":idUser},
                {"hour":11,"status":true,"user":idUser},
                {"hour":12,"status":true,"user":idUser},
                {"hour":13,"status":true,"user":idUser},
                {"hour":14,"status":true,"user":idUser},
                {"hour":15,"status":true,"user":idUser},
                {"hour":16,"status":true,"user":idUser},
                {"hour":17,"status":true,"user":idUser},
            ];


            room.dates[date][hour-8]=  {"hour":hour,"status":false,"user":idUser};
            res.status(201).send("order saved");


        }
        else{

            if( room.dates[date][hour-8].status=true){
                room.dates[date][hour-8]=  {"hour":hour,"status":false,"user":idUser};
                res.status(201).send("order saved");

            }
            else{
                res.status(500).send("Room is not available");
            }

        }

        // cupdate hour



    }*/

    var SaveOrder = function (req, res) {
        var orderRoom = req.body;
        var query = {};
        var room=orderRoom.room;
        var date=orderRoom.date;
        var hour=orderRoom.hour;
        var idUser = orderRoom.userID;
        var roomFound={};


        if (room) {
            query.name = new RegExp(room, "i");
        }

        Room.findOne(query).exec(query, function (err, rooms) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                roomFound=rooms;
            }
        });
console.log(roomFound);
        if(!roomFound.dates[date]){
            roomFound.dates.push(date);
            roomFound.dates[date]=[
                {"hour":8,"status":true,"user":idUser},
                {"hour":9,"status":true,"user":idUser},
                {"hour":10,"status":true,"user":idUser},
                {"hour":11,"status":true,"user":idUser},
                {"hour":12,"status":true,"user":idUser},
                {"hour":13,"status":true,"user":idUser},
                {"hour":14,"status":true,"user":idUser},
                {"hour":15,"status":true,"user":idUser},
                {"hour":16,"status":true,"user":idUser},
                {"hour":17,"status":true,"user":idUser},
            ];


            roomFound.dates[date][hour-8]=  {"hour":hour,"status":false,"user":idUser};
            res.status(201).send("order saved");


        }
        else{

            if( roomFound.dates[date][hour-8].status=true){
                roomFound.dates[date][hour-8]=  {"hour":hour,"status":false,"user":idUser};
                res.status(201).send("order saved");

            }
            else{
                res.status(500).send("Room is not available");
            }

        }

        // cupdate hour



    }

    /*

     if(!room.dates["15-07-2015"])
     rooom.dates["15-07-2015"]=[{"09":true},{"09":true}];
     else
     */


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
        SaveOrder: SaveOrder,
        deleteIt:deleteIt
    };

};



module.exports = roomController;