/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Book = require('../models/book.js');

var bookController = function (Book) {

    var post = function (req, res) {
        var newBook = req.body;
        var book = new Book(newBook);
        book.save(function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send(book);
            }
        });
    }
    var get = function (req, res) {
        var query = {};

        Book.find(query, function (err, books) {
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
        get: get
    };

};



module.exports = bookController;