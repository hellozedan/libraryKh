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
        var editAuthor;


        if(newAuthor._id) {
            editAuthor=Author.find({_id:author._id});
            editAuthor.update(author,function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(author);
                }
            });
        }

        else{
            author.save(function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(400).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(author);
                }
            });

        }


    }











    var get = function (req, res) {
        var query = {};

        Author.find(query).sort({'_id': 'descending'}).exec(query, function (err, authors) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(authors);
            }
        });

    }


    var deleteIt = function (req, res) {

        var idForDelete = req.headers['author_id'];
        var deleteAuthor;

        deleteAuthor={_id:idForDelete};


        Author.remove(deleteAuthor,function (e) {
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



module.exports = authorController;