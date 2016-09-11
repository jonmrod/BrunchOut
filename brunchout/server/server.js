// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration
var conn = mongoose.createConnection('mongodb://localhost/brunches');
var conn2 = mongoose.createConnection('mongodb://localhost/users');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
// Models
var Brunch = conn.model('Brunch', {
    type: String,
    location: Object,
    title: String,
    content: String,
    votes: Number,
    createdAt: Date,
    createdBy: String,
    idOfCreator: String,
    imgOfCreator: String,
    comments: [
      {
          comment: String,
          name: String,
          createdAt: Date,
          img: String
      }
    ]
});

var User = conn2.model('User', {
  fName: String,
  lName: String,
  email: String,
  password: String,
  role: String,
  teamName: String,
  img: String
})

// Routes
//create user
app.post('/createuser', function(req, res) {
  var user = new User();      
  user.fName = req.body.fName;
  user.lName = req.body.lName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;
  user.img = req.body.img;
  user.teamName = req.body.teamName;

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ 
      message: 'user created!',
      user
    });
  });
});
//authenticate user
app.post('/authenticate', function(req, res) {
    User.find({ email: req.body.email, password: req.body.password }, function(err, User) {
        if (err) {
          res.send(err);
        }
        if (User.length > 0) {
          res.json(User);
        }
    });
});
//get all brunches
app.get('/api/brunches', function(req, res) {
    Brunch.find(function(err, brunch){
        if(err){
            res.send(err);
        } else {
            res.json(brunch);
        }
    });
});
//get all users
app.get('/api/users', function(req, res) {
    User.find(function(err, user){
        if(err){
            res.send(err);
        } else {
            res.json(user);
        }
    });
})
//new brunch
app.post('/api/brunches', function(req, res) {
  var brunch = new Brunch();     
  brunch.title = req.body.title; 
  brunch.type = req.body.type;
  brunch.content = req.body.content;
  brunch.location = req.body.location;
  brunch.votes = 0;
  brunch.createdBy = req.body.createdBy;
  brunch.idOfCreator = req.body.idOfCreator;
  brunch.imgOfCreator = req.body.imgOfCreator;
  brunch.createdAt = new Date();
  
  brunch.save(function(err, brunch) {
    if (err)
      res.send(err);
    res.json({ message: 'brunch created!' });
  });
});
//get brunch by id
app.get('/api/brunches/:brunchId', function(req, res) {
    Brunch.findById(req.params.brunchId, function(err, brunch) {
        if (err)
            res.send(err);
        res.json(brunch);
    });
});
//delete brunch
app.delete('/api/brunches/:brunchId', function(req, res) {
    Brunch.remove({
        _id: req.params.brunchId
    }, function(err, brunch) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});
app.post('/api/upvoteBrunch/:brunchId', function(req, res) {
    Brunch.update({
        _id: req.params.brunchId}, {$inc: {votes: 1}}, function(err, brunch) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully upvoted' });
    });
})
//new brunch comment
app.post('/api/comment/new', function(req, res) {
    Brunch.update({
        _id: req.body.brunchId}, {$push: { comments: { 
        comment: req.body.comment,
        name: req.body.userName,
        img: req.body.img,
        createdAt: new Date()
        }}}, function(err, brunch) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully commented' });
    });
})
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");