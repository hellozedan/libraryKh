/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(Category) {
    debugger
    var categoryRouter = express.Router();
    debugger
    var categoryController = require("../controllers/categoryController")(Category);

    categoryRouter.route('/')
        .post(categoryController.post)
        .get(categoryController.get)
        .delete(categoryController.deleteIt);

    return categoryRouter;
};

module.exports =  routes;
