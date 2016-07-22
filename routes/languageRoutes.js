/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(Language) {
    var languageRouter = express.Router();

    var languageController = require("../controllers/languageController")(Language);

    languageRouter.route('/')
        .post(languageController.post)
        .get(languageController.get)
        .delete(languageController.deleteIt);

    return languageRouter;
};

module.exports =  routes;
