/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Category = require('../models/category.js');

var categoryController = function (Category) {

    var post = function (req, res) {
        var newCategory = req.body;
        var category = new Category(neCategory);
        category.save(function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send(category);
            }
        });
    }
    var get = function (req, res) {
        var query = {};

        Category.find(query, function (err, categories) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(categories);
            }
        });

    }


    return {
        post: post,
        get: get
    };

};



module.exports = categoryController;