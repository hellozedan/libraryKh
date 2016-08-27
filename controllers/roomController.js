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
        var room = DefineRoomDates(newRoom);
     /*   room.lastDate.setDate( room.lastDate.get);*/
        room.lastDate.setHours(0,0,0,0);
        room.Tomorrow.date.setDate( room.Tomorrow.date.getDate() + 1);
        room.AfterTomorrow.date.setDate( room.AfterTomorrow.date.getDate() + 2);
        var editRoom;


//create new room
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
//edit room
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

        /* CheckAndEditDates();*/
        var query = {};

        Room.find(query).sort({'_id': 'descending'}).exec(query, function (err, roomsArray) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {

                if(roomsArray){
                    var lastDate=roomsArray[0].lastDate;
                    var dateNow = new Date();
                    var timeDiff = Math.abs(dateNow.getTime() - lastDate.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if(diffDays!=1){
                        CheckAndEditDates(roomsArray,diffDays);
                        res.status(200).send(roomsArray);
                    }
                    else{
                        res.status(200).send(roomsArray);
                    }
                }
            }
        });

    }

//save order
    /*
    * case1: the same date - diff=0
    * case2: diff =1
    * case 3: diff=2
    * case 4: diff>2
    * */
    var SaveOrder = function (req, res) {
        //call check date and update

        var query = {};
        var orderRoom = req.body;

        var room=orderRoom.room;
        var date=orderRoom.date;
        var hour=orderRoom.hour;
        var status=orderRoom.status;
        var idUser =orderRoom.userID;


        var roomFound={};


        if (room) {
            query._id = req.body._id;
          /*  query.name = req.body.room;*/
        }
        else
        {
            res.status(500).send("room not found");
        }


        Room.findOne(query).sort({'_id': 'descending'}).exec(query, function (err, roomFound) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                if (roomFound) {

                if (date == "today") {
                    roomFound.Today.hours[hour - 8]={"hour": hour, "status": status, "user": idUser};
                    roomFound.update(roomFound,function (e) {
                        if (e) {
                            console.log('error: ' + e);
                            res.status(500).send(err);
                        } else {
                            res.status(201).send("order saved");

                        }
                    });

                }
                else if (date == "tomorrow") {

                    roomFound.Tomorrow.hours[hour - 8]={"hour": hour, "status": status, "user": idUser};
                    roomFound.update(roomFound,function (e) {
                        if (e) {
                            console.log('error: ' + e);
                            res.status(500).send(err);
                        } else {
                            res.status(201).send("order saved");

                        }
                    });
                }
                else {
                    roomFound.AfterTomorrow.hours[hour - 8]={"hour": hour, "status": status, "user": idUser};
                    roomFound.update(roomFound,function (e) {
                        if (e) {
                            console.log('error: ' + e);
                            res.status(500).send(err);
                        } else {
                            res.status(201).send("order saved");

                        }
                    });
                }
            }
            else{
                    res.status(500).send("room not found");

            }
        }});




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




var  DefineRoomDates = function(newRoom){
   /* var currentDate = Date.now();*/


    var room=newRoom;
  /*  room.lastDate=currentDate.getYear()+"/"+currentDate.getMonth()+"/"+currentDate.getDay();*/
    room.lastDate= Date.now();
    //today
    room.Today={};
   room.Today.date= Date.now();
    room.Today.hours=[];
    var i;

    for (i = 8; i <= 17; i++) {
        room.Today.hours.push({hour:i,status:true,user:''});
    }
    // tomorrow
    room.Tomorrow={};
    room.Tomorrow.date= Date.now();
    /*room.Tomorrow.date.setDate( room.Tomorrow.date.getDay() + 1)
*/
    room.Tomorrow.hours=[];
    var i;
    for (i = 8; i <= 17; i++) {
        room.Tomorrow.hours.push({hour:i,status:true,user:''});
    }
    // after tomorrow
    room.AfterTomorrow={};
    room.AfterTomorrow.date= Date.now();
/*
    room.AfterTomorrow.date= Date.now()+2;
*/


    room.AfterTomorrow.hours=[];
    var i;
    for (i = 8; i <= 17; i++) {
        room.AfterTomorrow.hours.push({hour:i,status:true,user:''});
    }


    return new Room(room);
}

var newlastDate= Date.now();

/*
 * case1: the same date - diff=0
 * case2: diff =1
 * case 3: diff=2
 * case 4: diff>2
 * */

    var CheckAndEditDates= function(roomsArray,diffDays){

//call query to return rrom
var j=0;
        for( j=0; j< roomsArray.length;j++){
            //case 1


                //get deff between dates

                //case 2
                if(diffDays==2){

                    var TomorrowHelp=  roomsArray[j].Tomorrow.hours;
                    var AfterTomorrowHelp=  roomsArray[j].AfterTomorrow.hours;
                    roomsArray[j].Today.hours=[];
                    roomsArray[j].Tomorrow.hours=[];
                    roomsArray[j].AfterTomorrow.hours=[];

                    for (i = 8; i <= 17; i++) {

                        roomsArray[j].Today.hours.push(TomorrowHelp[i-8]);
                        roomsArray[j].Tomorrow.hours.push(AfterTomorrowHelp[i-8]);
                        roomsArray[j].AfterTomorrow.hours.push({hour:i,status:true,user:''});

                    }


                }
                else if(diffDays==3){
                    var TomorrowHelp=  roomsArray[j].Tomorrow.hours;
                   /* var AfterTomorrowHelp=  roomsArray[j].AfterTomorrow.hours;*/
                    roomsArray[j].Today.hours=[];
                    roomsArray[j].Tomorrow.hours=[];
                    roomsArray[j].AfterTomorrow.hours=[];
                    for (i = 8; i <= 17; i++) {

                        roomsArray[j].Today.hours.push(TomorrowHelp[i-8]);
                        roomsArray[j].Tomorrow.hours.push({hour:i,status:true,user:''});
                        roomsArray[j].AfterTomorrow.hours.push({hour:i,status:true,user:''});

                    }
                }
                else{
                    roomsArray[j].Today.hours = [];
                    roomsArray[j].Tomorrow.hours = [];
                    roomsArray[j].AfterTomorrow.hours = [];
                     for (i = 8; i <= 17; i++) {

                         roomsArray[j].Today.hours.push({hour: i, status: true, user: ''});
                         roomsArray[j].Tomorrow.hours.push({hour: i, status: true, user: ''});
                         roomsArray[j].AfterTomorrow.hours.push({hour: i, status: true, user: ''});


                     }

                   /* for (i = 8; i <= 17; i++) {
                        room.Today.hours = [];
                        room.Today.hours.push({hour: i, status: true, user: ''});
                        room.Tomorrow.hours = [];
                        room.Tomorrow.hours.push({hour: i, status: true, user: ''});
                        room.AfterTomorrow.hours = [];
                        room.AfterTomorrow.hours.push({hour: i, status: true, user: ''});


                }*/
                    roomsArray[j].lastDate=newlastDate;
                    roomsArray[j].lastDate.setHours(0,0,0,0);
                    roomsArray[j].update(roomsArray[j],function (e) {
                        if (e) {
                            console.log('error: ' + e);
                            res.status(500).send(err);
                        } else {
                            console.log('no error');

                        }
                    });
                }
            //save room
            roomsArray[j].lastDate=newlastDate;
            roomsArray[j].lastDate.setHours(0,0,0,0);
            roomsArray[j].update(roomsArray[j],function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');

                }
            });


            }


    }

    return {
        post: post,
        get: get,
        SaveOrder: SaveOrder,
        deleteIt:deleteIt,
        DefineRoomDates:DefineRoomDates,
        CheckAndEditDates:CheckAndEditDates
    };
}
module.exports = roomController;