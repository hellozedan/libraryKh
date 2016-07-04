/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Author = require('../models/author.js');

var authorController = function (Author) {

    var post = function (req, res) {
        var newAuthor = req.body;
        var author = new Author(newAuthor);
        author.save(function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send(author);
            }
        });
    }
    var get = function (req, res) {
        var query = {};

        Author.find(query, function (err, authors) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(authors);
            }
        });

    }


    return {
        post: post,
        get: get
    };

};



module.exports = authorController;