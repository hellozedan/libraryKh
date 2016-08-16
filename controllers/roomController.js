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
        var query = {};

        Room.find(query).sort({'_id': 'descending'}).exec(query, function (err, rooms) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(rooms);
                // edit and check dates method
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
       /* CheckAndEditDates();*/
        var query = {};
        var orderRoom = req.body;

        var room=orderRoom.room;
        var date=orderRoom.date;
        var hour=orderRoom.hour;
        var idUser = orderRoom.userID;
        var roomFound={};


        if (room) {
            query.name = req.body.room;
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
                    roomFound.Today.hours[hour - 8]={"hour": hour, "status": false, "user": idUser};
                    res.status(201).send("order saved");
                }
                else if (date == "tomorrow") {


                    roomFound.Tomorrow.hours[hour - 8] = ({"hour": hour, "status": false, "user": idUser});


                    res.status(201).send("order saved");
                }
                else {
                    roomFound.Tomorrow.hours[hour - 8] = ({"hour": hour, "status": false, "user": idUser});

                    res.status(201).send("order saved");
                }
                    roomFound.save();
            }
            else{
                    res.status(500).send(err);

            }
        }});
       /* Room.findOne(query).sort({'_id': 'descending'}).exec(query, function (err, rooms) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                roomFound=rooms;
                // edit and check dates method
            }
        });*/
       /* Room.find({}).sort({'_id': 'descending'}).exec(query, function (err, rooms) {

            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                roomFound=rooms;
            }
        });*/
       /* if(date=="today"){
            roomFound.Today.hours[8-hour]=({"hour":hour,"status":false,"user":idUser});
            res.status(201).send("order saved");
        }
        else   if(date=="tomorrow"){
            roomFound.Tomorrow.hours[8-hour]=({"hour":hour,"status":false,"user":idUser});
            res.status(201).send("order saved");
        }
        else{
            roomFound.Tomorrow.hours[8-hour]=({"hour":hour,"status":false,"user":idUser});
            res.status(201).send("order saved");
        }
*/




        /* if(!roomFound.dates[date]){
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
 */
        // cupdate hour



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

  /*  var SaveOrder = function (req, res) {
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
*/
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



/*
 * case1: the same date - diff=0
 * case2: diff =1
 * case 3: diff=2
 * case 4: diff>2
 * */

    var CheckAndEditDates= function(){

//call query to return rrom
        for(room in Room){
            //case 1
            if(room.lastDate!=Date.now()){

                //get deff between dates

               /* room.Today.date.setDate(room.lastDate.getDate()+1);
                room.Tomorrow.date.setDate(room.lastDate.getDate()+2);
                room.AfterTomorrow.date.setDate(room.lastDate.getDate()+3);*/
                //case 2
                if(room.lastDate.getDate()+1==Date.now.getDate()){
                    for (i = 8; i <= 17; i++) {
                        room.Today.hours=[];
                        room.Today.hours.push(room.Tomorrow.hours[i-8]);
                        room.Tomorrow.hours=[];
                        room.Tomorrow.hours.push(room.AfterTomorrow.hours[i-8]);
                        room.AfterTomorrow.hours=[];
                        room.AfterTomorrow.hours.push({hour:i,status:true,user:''});

                    }


                }
                else if(room.lastDate.getDate()+2==Date.now.getDate()){
                    for (i = 8; i <= 17; i++) {
                        room.Today.hours=[];
                        room.Today.hours.push(room.Tomorrow.hours[i-8]);
                        room.Tomorrow.hours=[];
                        room.Tomorrow.hours.push({hour:i,status:true,user:''});
                        room.AfterTomorrow.hours=[];
                        room.AfterTomorrow.hours.push({hour:i,status:true,user:''});

                    }
                }
                else{
                    room.Today.hours=[];
                    room.Today.hours.push({hour:i,status:true,user:''});
                    room.Tomorrow.hours=[];
                    room.Tomorrow.hours.push({hour:i,status:true,user:''});
                    room.AfterTomorrow.hours=[];
                    room.AfterTomorrow.hours.push({hour:i,status:true,user:''});

                }
                room.lastDate.setDate(Date.now.getDate());
            }

        }
        return true;
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