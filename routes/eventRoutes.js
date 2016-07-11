/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(Event) {
    var eventRouter = express.Router();

    var eventController = require("../controllers/eventController")(Event);

    eventRouter.route('/')
        .post(eventController.post)
        .get(eventController.get)
        .delete(eventController.deleteIt);

    return eventRouter;
};

module.exports =  routes;
