/**
 * Created by josephk on 6/10/2015.
 */


var express = require('express');


var routes = function(Person) {
    var personRouter = express.Router();

    var personController = require("../controllers/personController")(Person);

    personRouter.route('/search/')
        .post(personController.get);
    personRouter.route('/')
        .post(personController.post)
        .get(personController.get)
            .delete(personController.deleteIt);

    return personRouter;
};

module.exports =  routes;
