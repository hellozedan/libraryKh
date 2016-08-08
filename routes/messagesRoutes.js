/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(Messages) {
    var messagesRouter = express.Router();

    var messagesController = require("../controllers/messagesController")(Messages);

  /*  messagesRouter.route('/search/')
        .post(messagesController.get);*/
    messagesRouter.route('/')
        .post(messagesController.post)
        .get(messagesController.get);

    return messagesRouter;
};

module.exports =  routes;
