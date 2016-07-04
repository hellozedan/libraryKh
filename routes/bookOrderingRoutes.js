/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(BookOrdering) {
    var bookOrderingRouter = express.Router();

    var bookOrderingController = require("../controllers/bookOrderingController")(BookOrdering);

    bookOrderingRouter.route('/')
        .post(bookOrderingController.post)
        .get(bookOrderingController.get);

    return bookOrderingRouter;
};

module.exports =  routes;
