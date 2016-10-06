var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//var cors = require("cors");


//var db = mongoose.connect('mongodb://localhost/userAPI');
var db = mongoose.connect('mongodb://user:admin@ds023674.mlab.com:23674/librarymongodb');

var User = require('./models/user');
var Usertrack = require('./models/usertrack');
var Book = require('./models/book');
var Event = require('./models/event');
var Person = require('./models/person');
var Author = require('./models/author');
var Category = require('./models/category');
var Language = require('./models/language');
var Room = require('./models/room');
var BookOrdering = require('./models/bookOrdering');
var Messages = require('./models/messages');

var Message = require('./models/message');

var app = express();
var cors = require('cors');
var port = process.env.PORT || 5000;


app.set('superSecret', 'beenthere');

//configure the app to use body parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//var corsOptions = {
//  credentials: true,
//  origin: function(origin,callback) {
////    if(origin===undefined) {
////      callback(null,false);
////    } else {
//      var allowed = true;
//      callback(null,allowed);
////    }
//  }
//};
//app.use(cors(corsOptions));


var userRouter = require("./routes/userRoutes")(User);
var usertrackRouter = require("./routes/usertrackRoutes")(Usertrack);
var bookRouter = require("./routes/bookRoutes")(Book);
var eventRouter = require("./routes/eventRoutes")(Event);
var personRouter = require("./routes/personRoutes")(Person);
var authorRoutes = require("./routes/authorRoutes")(Author);
var categoryRoutes = require("./routes/categoryRoutes")(Category);
var languageRoutes = require("./routes/languageRoutes")(Language);
var RoomRoutes = require("./routes/roomRoutes")(Room);
var bookOrderingRouter = require("./routes/bookOrderingRoutes")(BookOrdering);

var messageRouter = require("./routes/messageRoutes")(Message);
var messagesRouter = require("./routes/messagesRoutes")(Messages);

//app.use(function(req, res, next){
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', '*');
//    next();
//});


app.use(function (req, res, next) {
    //console.log('req.body: ' + req.body)
    //console.log('Loading x-access-token -- begin.');
    if (((req.path === "/api/person")||(req.path === "/api/person/search")) && req.method === "POST") {
        next();
    }
    else {


        var token = req.body.token || req.query.token || req.headers['token'];

        if (token) {
            //       console.log('Loading x-access-token -- we have token: ' + token);
            var query = {};
            query.token = token;

            Person.find(query, function (err, users) {
                if (err) {
                    //          console.log('Loading x-access-token -- we have an error.');
                    //           console.log(err);
                    return res.status(403).send({
                        success: false,
                        message: 'Wrong token provided.'
                    });
                } else if (users && users[0]) {
                    //           console.log('Loading x-access-token -- it looks good, username: ' + users[0].firstName + '  ' + users[0].lastName);
                    req.authuser = users[0];
                    next(); // continue to the request handling.
                } else {
                    //  console.log('Loading x-access-token -- no such token in db.');
                    //   console.log(users);
                    return res.status(403).send({
                        success: false,
                        message: 'Wrong token provided.'
                    });
                }
            });
        } else {
            // if there is no token
            // return an error
            //  console.log('Loading x-access-token -- there is no token in the request.');
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
});


app.use('/api/users', userRouter);
app.use('/api/usertracks', usertrackRouter);
app.use('/api/book', bookRouter);
app.use('/api/event', eventRouter);
app.use('/api/person', personRouter);
app.use('/api/author', authorRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/language', languageRoutes);
app.use('/api/room', RoomRoutes);
app.use('/api/bookOrdering', bookOrderingRouter);

app.use('/api/message', messageRouter);
app.use('/api/messages', messagesRouter);


//simple startit forward route
app.get('/', function (req, res) {
    res.send('BTS - Server v0.2 ');
});


app.listen(port, function () {
    console.log('-----App running on port: ' + port);
});



