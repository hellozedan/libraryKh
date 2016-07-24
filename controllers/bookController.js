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
        var editBook;


        if(newBook._id) {
            editBook=Book.find({_id:book._id});
            editBook.update(book,function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(book);
                }
            });
        }

        else{
            book.save(function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(400).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(book);
                }
            });

        }

    }







    var get = function (req, res) {


        var query = {};
if(!req.body) {
    Book.find(query).sort({'_id': 'descending'}).exec(query, function (err, books) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(books);
        }
    });
}
        else
{



    if(req.body.title) {
        query.title = new RegExp(req.body.title, "i");
    }

    if(req.body.author) {
        query.author = new RegExp(req.body.author, "i");
    }
    if(req.body.language) {
        query.language = new RegExp(req.body.language, "i");
    }
    if(req.body.category) {
        query.category = new RegExp(req.body.category, "i");
    }
    if(req.body.author) {
        query.author = new RegExp(req.body.author, "i");
    }




    Book.find(query).sort({'_id': 'descending'}).exec(query, function (err, books) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(books);
        }
    });
}

    }


    var deleteIt = function (req, res) {

        var idForDelete = req.headers['book_id'];
        var deleteBook;

        deleteBook={_id:idForDelete};


        Book.remove(deleteBook,function (e) {
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



module.exports = bookController;