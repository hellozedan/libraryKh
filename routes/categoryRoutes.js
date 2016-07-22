/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(Book) {
    var categoryRouter = express.Router();

    var categoryController = require("../controllers/categoryController")(Book);

    categoryRouter.route('/')
        .post(categoryController.post)
        .get(categoryController.get)
        .delete(categoryController.deleteIt);

    return categoryRouter;
};

module.exports =  routes;
