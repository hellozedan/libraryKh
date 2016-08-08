/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Messages = require('../models/messages.js');

var bookController = function (Messages) {

    var post = function (req, res) {
        var newMSG = req.body;
        var message = new Messages(newMSG);

        var editMSG;


        if(newMSG._id) {
            editMSG=Messages.find({_id:newMSG._id});
            editMSG.update(author,function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(message);
                }
            });
        }

        else {
            message.save(function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(400).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(message);
                }
            });

        }

    }






    var get = function (req, res) {

        var authuser= req.headers['person_id'];
        var query = {
            $or: [{receiverUser:authuser}, {senderUser: authuser}] // in clinet add filter if user is the sender of receiver
        };


    Messages.find(query).sort({'addedTime': 'descending'}).exec(query, function (err, books) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(books);
        }
    });
}








    return {
        post: post,
        get: get,
    };

};



module.exports = bookController;