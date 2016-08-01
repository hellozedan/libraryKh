/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(Room) {
    var roomRouter = express.Router();

    var roomController = require("../controllers/roomController")(Room);


    roomRouter.route('/save')
        .post(roomController.SaveOrder);
    roomRouter.route('/')
        .post(roomController.post)
        .get(roomController.get)
        .delete(roomController.deleteIt);
    return roomRouter;
};

module.exports =  routes;
