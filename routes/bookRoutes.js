/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(Book) {
    var bookRouter = express.Router();

    var bookController = require("../controllers/bookController")(Book);

    bookRouter.route('/search/')
        .post(bookController.get);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get)
        .delete(bookController.deleteIt);

    return bookRouter;
};

module.exports =  routes;
