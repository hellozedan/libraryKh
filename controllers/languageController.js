/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Language = require('../models/language.js');

var languageController = function (Language) {


    var post = function (req, res) {
        var newLanguage = req.body;
        var language = new Language(newLanguage);
        var editLanguage;



        if(newLanguage._id) {
            editLanguage=Language.find({_id:language._id});
            editLanguage.update(language,function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(language);
                }
            });
        }
        else
        {


            language.save(function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(language);
                }
            });
        }
    }




    var get = function (req, res) {
        var query = {};

        Language.find(query).sort({'_id': 'descending'}).exec(query, function (err, languages) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(languages);
            }
        });

    }


    var deleteIt = function (req, res) {

        var idForDelete = req.headers['language_id'];
        var deleteLanguage;

        deleteLanguage={_id:idForDelete};


        Language.remove(deleteLanguage,function (e) {
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



module.exports =languageController;