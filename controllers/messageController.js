/**
 * Created by Joe on 06/06/2015.
 */



var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Message = require('../models/message.js');

var messageController = function(Message){


    // add new message
    var post = function (req, res) {
        if (req.body && req.body.message) {

            var newMessage = req.body.message;

            var message = new Message(newMessage);
          /*  message.senderUser=req.authuser._id;*/
            // add user sender from client
            message.save(function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(message);
                }
            });
        }
    };

    var get = function (req, res) {
        var query = {
            $or: [{receiverUser: req.authuser._id}, {senderUser: req.authuser._id}] // in clinet add filter if user is the sender of receiver
        };
        console.log('no error-good');
        Message.find(query) //, function (err, messages) {
          //  .sort({date_added: -1})
            .populate('receiverUser', 'firstName lastName fbPhotoUrl')
            .populate('senderUser', 'firstName lastName fbPhotoUrl')
            .exec(function (err, message) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.json(message);
                }
            });
    };

    var findById = function(req, res, next){
        Message.findById(req.params.messageId, function (err, message) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if(message){
                req.message = message;
                next(); // continue to the request handling.
            }else{ //in case no message found.
                res.status(404).send("No Message Found.");
            }
        });
    };


    var deleteAll = function(req, res, next){
        Message.remove({}, function(err, message) {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(204).send("Removed");
            }
        });

    };

    var getByID = function (req, res) {
        res.json(req.message);
    };

    var patch = function(req,res){
        if(req.message._id) { //we don't allow changing the _id, so we prevent it by deleting the '_id' parameter from the request body before we continue.
            delete req.body._id;
        }

        for(var param in req.body){//we go over existing parameters from the JSON in the request body, and only change them.
            req.message[param] = req.body[param];
        }

        req.message.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(req.message);
            }
        });
    };

    var deleteItem = function(req,res){
        req.message.remove(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(204).send("Removed");
            }
        });
    };

    var put =  function (req, res) {
        req.message.isRead = req.body.isRead;

        req.message.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(req.message);
            }
        });
    };



    var doSearch = function (req, res) {

        var query = {};



        var idUser = req.headers['userid'];

        if (idUser) {
            query.receiverUser = new RegExp(idUser, "i");
        }



        Message.find(query).exec( function (err, a) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(a);
            }
        });

    };


    return{
        post: post,
        get: get,
        findById: findById,
        getByID: getByID,
        patch: patch,
        delete: deleteItem,
        deleteall: deleteAll,
        put: put,
        doSearch:doSearch
    };
};

module.exports = messageController;