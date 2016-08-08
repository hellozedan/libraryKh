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
        if(!newPerson._id) {
            var token = require('crypto').randomBytes(64).toString('hex');
            newPerson.token=token;
        }
        var person = new Person(newPerson);
        var editPerson;



        if(!newPerson._id) {


            if(PersonNotExist(person.id)) {
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
                res.status(500).send("Person Exist");
            }
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


        if(req.method==="GET") {
            Person.find(query).sort({'_id': 'descending'}).exec(query, function (err, persons) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).send(persons);
                }
            });
        }

        else
        {


            if(req.body.Username) {
               /* query.id =new RegExp(req.body.Username, "i");*/
                query.id =req.body.Username;
            }

            Person.findOne(query).sort({'_id': 'descending'}).exec(query, function (err, personFound) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {



               if(personFound==null){
             res.status(500).send("Invalid ID");

            }

                    if(!personFound.password){
                        res.status(500).send("Invalid PassWord");
                    }
                   if(personFound.password==req.body.Password) {

                       res.status(200).send(personFound);
                   }
                    else{
                       res.status(500).send("Invalid Password");
                   }
                }
            });

        }

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

var PersonNotExist = function(id){
    var query = {};
    query.id=id;

    Person.findOne(query).sort({'_id': 'descending'}).exec(query, function (err, personFound) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {

            if(personFound==null){
                return true;

            }
            else{
                return false
            }


        }
    });

    return true;
}

module.exports = personController;