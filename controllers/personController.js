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



        if(!newPerson._id) {
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

        //   Person.update(person._id,person);


            editPerson=Person.find({_id:newPerson._id});
            editPerson.update(newPerson,function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).send(err);
                } else {
                    console.log('no error');
                    res.status(201).send(newPerson);
                }
            });

        }
    };
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

    };

    var deleteIt = function (req, res) {

        var idForDelete = req.headers['person_id'];
       // var person = new Person(newPerson);
        var deletePerson;

        deletePerson={_id:idForDelete};


        Person.remove(deletePerson,function (e) {
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



module.exports = personController;