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
        var category = new Category(newCategory);
        var editCategory;

        if(newCategory._id) {
            
            editCategory=Category.find({_id:category._id});
            editCategory.update(category,function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(category);
                }
            });
        }

        else {
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
    }
    var get = function (req, res) {
        var query = {};

        Category.find(query).sort({'_id': 'descending'}).exec(query, function (err, categories) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(categories);
            }
        });

    }


    var deleteIt = function (req, res) {

        var idForDelete = req.headers['category_id'];
        var deleteCategory;

        deleteCategory={_id:idForDelete};


        Category.remove(deleteCategory,function (e) {
            if (e) {
                console.log('error: ' + e);
                res.status(500).send(err);
            } else {
                console.log('no error');
                res.status(201).send("deleted");
            }
        })};

    return {
        post: post,
        get: get,
        deleteIt:deleteIt
    };
};



module.exports = categoryController;