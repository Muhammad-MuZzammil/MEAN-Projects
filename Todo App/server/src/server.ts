/// <reference path='../typings/tsd.d.ts' />

import express = require('express');
import path = require('path');

import bodyParser = require('body-parser');

var app : express.Express = express();

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname, '/../../client')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var todos : Array<{ id : number, User:string, Taskname: string }> = [];

app.get('/', function(req, res){
    //console.log(path.join(__dirname, '/../../client/index.html'))
    res.sendFile(path.join(__dirname, '/../../client/index.html'))
})

//Get - Read Todos
app.get("/api/todo/:id?", function(req, res){
	if(req.params.id){
		for(var i = 0; i < todos.length; i++ ){
			if(req.params.id == todos[i].id){
				res.json(todos[i])		
				return;
			}
		}
		res.json({ status : false, message: "Not Found" })	
	} else {
		res.json(todos);
	}	
})

//Delete - Destroy/Delete Todos
app.delete("/api/todo/:id", function(req, res){
	for(var i = 0; i < todos.length; i++ ){
		if(req.params.id == todos[i].id){
			todos.splice(i , 1);
			res.json({ status : true })		
			return;
		}
	}
	res.json({ status : false, message: "Not Found" })	
})

//Delete - Create Todos
app.post("/api/todo", function(req, res){
	
	 console.log("req.body")
    console.log(req.body)
	
	
	var obj = {
		
		id : Date.now(),
		User: req.body.User,
		Taskname : req.body.Taskname
	
}	
	todos.push(obj)
	res.json({ status : true, todo: obj })	
})

//Delete - Update Todos
app.put("/api/todo/:id?", function(req, res){
	if(req.params.id){		
		for(var i = 0; i < todos.length; i++ ){
			if(req.params.id == todos[i].id){
				todos[i].Taskname = req.body.Taskname;
				res.json(todos[i])		
				return;
			}
		}
		res.json({ status : false, message: "Not Found" })	
	} else {
		res.json({ status : false, message: "Invalid Id" });
	}	
})

var port: number = process.env.PORT || 3000;
var server = app.listen(port, () => {
	var listeningPort: number = server.address().port;
	console.log('The server is listening on port: ' + listeningPort);
});

