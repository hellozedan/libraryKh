/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Book = require('../models/book.js');
var Person = require('../models/person.js');

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
            book.user="";
            book.bookStatus='Available';
            book.followersArray=[];
            book.AvgRates=0;
            book.CountRates=0;
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
        if(req.method==="GET") {
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

    var AddFollower=function(req, res) {
        var bookId = req.body.book_ID;
        var user_ID = req.body.user_ID;
        var status = req.body.status;

         var editBook;
        editBook=Book.find({_id:bookId});
        if(status=='follow'){
            if(!editBook.followersArray){
                editBook.followersArray=[];}
            editBook.followersArray.push({userId:user_ID});
        }
        else if(status='unfollow'){
            if(!editBook.followersArray){
                editBook.followersArray=[];}
            var i=0;
            for(i=0;i<editBook.followersArray.length;i++){
                if(editBook.followersArray[i].userId==user_ID){
                    delete editBook.followersArray[i];
                }
            }
        }

        editBook.update(editBook,function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send('Ok');
            }
        });

    }


    var RemoveAllFollower=function(req, res) {
        var bookId = req.body.book_ID;
//send messages
        var editBook;
        editBook=Book.find({_id:bookId});
        editBook.followersArray=[];
        editBook.update(editBook,function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send(editBook);
            }
        });

    }


    var AddRate=function(req, res) {

        var book = req.body;
            Book.update({_id:req.body._id},book,function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send('Ok');
            }
        });

    }


    var gettopnine = function (req, res) {


        var query = {};


        Book.find(query).sort({'AvgRates': 'descending'}).limit(10).exec(query, function (err, books) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(books);
            }
        });
    }


    var getTopTen = function (req, res) {


        var query = {};


            Book.find(query).sort({'AvgRates': 'descending'}).limit(10).exec(query, function (err, books) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).send(books);
                }
            });
        }

    var hah = function (req, res) {
        var newBook = req.body;
        var book = new Book(newBook);
        var editBook;

        Book.find({}).sort({'_id': 'descending'}).exec({}, function (err, books) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(books);
            }
        });
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

    var getfollowing=function(req, res){
/*        debugger
        var query = {};
        var user_ID = req.body;
        var booksArray=[];
        Person.findById(user_ID).exec(query, function (err, personFound) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {

               var followingArray=personFound.followersArray;
                var i=0;
                for(i=0;i<followingArray.length;i++){
                    Book.findById(followingArray[i].bookId).exec(query, function (err, bookFound) {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        } else {
                            booksArray.push(bookFound);

                        }
                    });
                }

                res.status(201).send(BooksArray);

            }
        });*/


    }



    return {
        post: post,
        get: get,
        deleteIt:deleteIt,
        AddFollower:AddFollower,
        RemoveAllFollower:RemoveAllFollower,
        getTopTen:getTopTen,
        AddRate:AddRate,
       hah:hah
    };

};



module.exports = bookController;