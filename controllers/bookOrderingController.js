/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment = require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var BookOrdering = require('../models/bookOrdering.js');
var Book = require('../models/book.js');
var Person = require('../models/person.js');
var Messages = require('../models/messages.js');

var bookOrderingController = function (BookOrdering) {

    var post = function (req, res) {
        var newBookOrdering = req.body;
        var bookOrdering = new BookOrdering(newBookOrdering);
        var editBookOrdering;
        var idBook = req.body.book_ID;


        if (newBookOrdering._id) {


            editBookOrdering = BookOrdering.find({_id: newBookOrdering._id});
            editBookOrdering.update(newBookOrdering, function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');

                    if (newBookOrdering.status == "Finished" || newBookOrdering.status == "Cancelled") {

                        var thisBook = {};

                        // remove book from the list of person
                        var thisbook = {};
                        Book.find({_id: idBook}
                        ).exec({_id: idBook}, function (err, books) {
                                if (e) {
                                    console.log('error: ' + e);
                                    res.status(500).send(err);
                                } else {
                                    thisbook = books[0];


                                    if (thisbook&&thisbook.followersArray && thisbook.followersArray.length>0) {
                                        /* for (var i = 0; i < thisbook.followersArray.length; i++) {


                                         // need to review //TODO
                                         // delete book from followers array for each person
                                         var followerPersonID = thisbook.followersArray[i];
                                         var followerPerson = Person.find({_id: followerPersonID});
                                         var index = followerPerson.followersArray.indexOf(thisbook.followersArray[i]);
                                         followerPerson.followersArray.splice(index, 1);

                                         }*/


                                        var title = thisbook.title;
                                        followersManger(thisbook.followersArray, 0, title);

                                        function followersManger(followersArray, i, title) {

                                            var newMSG = {
                                                senderUser: '311538417',
                                                receiverUser: followersArray[i].userId,
                                                senderUser_ID: '57b3882d98becdc464d4a2a8',
                                                receiverUser_ID: followersArray[i].userId,
                                                senderName: 'Admin',
                                                receiverName: 'Book Follower',
                                                content: 'Your Book that yo followed:' + title + 'Is available noe, you can order it'
                                            };
                                            var message = new Messages(newMSG);
                                            console.log('message');
                                            message.save(function (e) {
                                                if (e) {
                                                    console.log('error: ' + e);

                                                } else {

                                                    Person.update({_id: followersArray[i].userId}, {
                                                        $inc: { MessagesLength: 1 }
                                                    }, function (e) {
                                                        if (e) {
                                                            console.log('error: ' + e);
                                                            res.status(500).send(err);
                                                        } else {
                                                            console.log('no error');

                                                        }
                                                    });
                                                    console.log('no error');

                                                }
                                                i++;
                                                if (i < followersArray.length) {
                                                    followersManger(followersArray, i, title);
                                                }
                                                else {
                                                    Book.update({_id: idBook}, {
                                                        bookStatus: 'Available',
                                                        user: "",
                                                        followersArray: []
                                                    }, function (e) {
                                                        if (e) {
                                                            console.log('error: ' + e);
                                                            res.status(500).send(err);
                                                        } else {
                                                            console.log('no error');
                                                            res.status(201).send("Done");
                                                        }
                                                    });
                                                }
                                            });

                                        }


                                    } else {
                                        Book.update({_id: idBook}, {
                                            bookStatus: 'Available',
                                            user: "",
                                            followersArray: []
                                        }, function (e) {
                                            if (e) {
                                                console.log('error: ' + e);
                                                res.status(500).send(err);
                                            } else {
                                                console.log('no error');
                                                res.status(201).send("Done");
                                            }
                                        });
                                    }


                                }
                            });


                    }


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


        if (req.method === "GET") {
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

        deleteBookOrdering = {_id: idForDelete};


        BookOrdering.remove(deleteBookOrdering, function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send("deleted");
            }
        })
    };


    var doSearch = function (req, res) {

        var query = {};


        var idUser = req.headers['userid'];

        if (idUser) {
            query.userID = new RegExp(idUser, "i");
        }


        BookOrdering.find(query).exec(function (err, a) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(a);
            }
        });

    };
    var A = function (i) {
        if (i >= 0) {
            B(i);
        }
        else {
            //Do finally
        }
    }

    var B = function (i) {


    }


    return {
        post: post,
        get: get,
        deleteIt: deleteIt,
        doSearch: doSearch
    };

};


module.exports = bookOrderingController;