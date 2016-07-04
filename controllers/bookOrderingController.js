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
        var bookOrdering = new Book(newBookOrdering);
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
    var get = function (req, res) {
        var query = {};

        BookOrdering.find(query, function (err, booksOrdering) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(booksOrdering);
            }
        });

    }


    return {
        post: post,
        get: get
    };

};



module.exports = bookOrderingController;