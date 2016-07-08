/**
 * Created by josephk on 6/10/2015.
 */
var mongoose = require('mongoose');
var moment=require('moment');
var httpAdapter = 'https';
var User = require('../models/user');
var Utils = require('../utils/utils.js');
var Person = require('../models/person.js');

var personController = function (Person) {

    var post = function (req, res) {
        var newPerson = req.body;
        var person = new Person(newPerson);
        var editPerson;

        if(person._id) {
            person.save(function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(person);
                }
            });
        }
        else{
         //   newPerson.findById(person._id);
            newPerson.findByIdAndUpdate(person._id,person);

        }
    }
    var get = function (req, res) {
        var query = {};

        Person.find(query, function (err, persons) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(persons);
            }
        });

    }


    return {
        post: post,
        get: get
    };

};



module.exports = personController;