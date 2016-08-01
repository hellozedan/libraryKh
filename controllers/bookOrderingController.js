/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var BookOrdering = require('../models/bookOrdering.js');

var bookOrderingController = function (BookOrdering) {

    var post = function (req, res) {
        var newBookOrdering = req.body;
        var bookOrdering = new BookOrdering(newBookOrdering);
        var editBookOrdering;



        if(newBookOrdering._id){


            editBookOrdering=BookOrdering.find({_id:newBookOrdering._id});
            editBookOrdering.update(newBookOrdering,function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(bookOrdering);
                }
            });
        }


      else {
            bookOrdering.save(function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(bookOrdering);
                }
            });
        }
    }




    var get = function (req, res) {
        var query = {};


        if(req.method==="GET") {
            BookOrdering.find(query).sort({'_id': 'descending'}).exec(query, function (err, booksOrdering) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).send(booksOrdering);
                }
            });

        }

     /*   else{

       /!*     var idUser = req.headers['userID'];

            if(idUser) {
                query.userID = new RegExp(idUser, "i");
            }
            else{
                res.status(500).send("Invalid User ID");
            }*!/

            BookOrdering.find(query).sort({'_id': 'descending'}).exec(query, function (err, booksOrdering) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).send(booksOrdering);
                }
            });

        }*/
    }

    var deleteIt = function (req, res) {

        var idForDelete = req.headers['bookOrdering_id'];
        var deleteBookOrdering;

        deleteBookOrdering={_id:idForDelete};


        BookOrdering.remove(deleteBookOrdering,function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send("deleted");
            }
        })};


    var doSearch = function (req, res) {

        var query = {};



        var idUser = req.headers['userid'];

        if (idUser) {
            query.userID = new RegExp(idUser, "i");
        }



        BookOrdering.find(query).exec( function (err, a) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(a);
            }
        });

    };
    return {
        post: post,
        get: get,
        deleteIt:deleteIt,
        doSearch:doSearch
    };

};



module.exports = bookOrderingController;