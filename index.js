var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;


var db = 'mongodb://andres:unodos3@ds047612.mongolab.com:47612/explguru';
//var db = "mongodb://localhost:27017/myway";


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/books', function (req, res) {
	
	// Connect to the db
MongoClient.connect(db, function (err, db) {
    
    db.collection('books', function (err, collection) {
        
         collection.find().toArray(function(err, items) {
            if(err) throw err;    
			res.json({data: items});			
        });
        
    });
                
});
	

  console.log("me han llamado books "+ new Date());
});


app.get('/books/:id', function (req, res) {
let chapters = {};	
var id =  require('mongodb').ObjectID(req.params.id);


		// Connect to the db
MongoClient.connect(db, function (err, db) {
    

    db.collection('books', function (err, collection) {
        
         collection.find({_id : id}).toArray(function(err, items) {
            if(err) throw err;    
			res.json({data: items});			
        });
        
    });
   
                
});


  
  
});


app.get('/chapters/father/:id', function (req, res) {
let chapters = {};	
let id = req.params.id;


		// Connect to the db
MongoClient.connect(db, function (err, db) {
    

    db.collection('chapters', function (err, collection) {
        
         collection.find({father : id}).toArray(function(err, items) {
            if(err) throw err;    
			res.json({data: items});			
        });
        
    });
   
                
});


  
  
});


    app.post('/books/new', function (req, res) {

		
		// Connect to the db
MongoClient.connect(db, function (err, db) {
    
    db.collection('books', function (err, collection) {
        
        collection.insert({ autor: req.body.author, title: req.body.title, text: req.body.text });

		
    });
                
});
		
		
		res.json({status : 'ok'});

    });
	
	
app.post('/chapters/new', function (req, res) {


console.log("Me han llamado Nuevo capitulo");


		// Connect to the db
MongoClient.connect(db, function (err, db) {
    
	
	db.collection('chapters').insert({ author: req.body.author, father: req.body.father, capitulo : parseInt(req.body.capitulo), text: req.body.text });
	
	db.collection('chapters').find({father : req.body.father, capitulo : parseInt(req.body.capitulo)}).toArray(function(err, items) {
				if(err) throw err;    
				res.json({data: items});			
			});
	
	

                
});
		
		
		//res.json({status : 'ok'});

    });
	

app.listen(80, function () {
  console.log('Example app listening on port 3000!');
});