/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(Author) {
    var authorRouter = express.Router();

    var authorController = require("../controllers/authorController")(Author);

    authorRouter.route('/')
        .post(authorController.post)
        .get(authorController.get)
        .delete(authorController.deleteIt);
    ;

    return authorRouter;
};

module.exports =  routes;
