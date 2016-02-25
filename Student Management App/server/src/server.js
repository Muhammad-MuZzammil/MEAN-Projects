/// <reference path='../typings/tsd.d.ts' />
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
mongoose.connect('mongodb://localhost:27017/students');
// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/../../client')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var studentSchema = new mongoose.Schema({
    id: Number,
    stuName: String,
    fatherName: String,
    rollNum: Number,
    stuAge: Number,
    gender: String,
    Del: Boolean,
    update: Boolean
});
var studentModel = mongoose.model('studentRecord', studentSchema);
// var students : Array<{ id : number, stuName:string,fatherName:string,rollNum:number,stuAge:number,gender:string,Del: boolean,update:boolean}> = [];
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../client/index.html'));
});
// Create Students
app.post("/createStudent", function (req, res) {
    var newStudent = new studentModel(req.body);
    newStudent.save(function (err, obj) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ status: true, stud: obj });
        }
    });
});
//Get - Read Students
app.get("/getStudent/:id?", function (req, res) {
    studentModel.find(function (err, data) {
        if (err)
            res.send(err);
        else {
            console.log(data);
            res.json(data);
        }
    });
    // if(req.params.id){
    // 	for(var i = 0; i < students.length; i++ ){
    // 		if(req.params.id == students[i].id){
    // 			res.json(students[i])		
    // 			return;
    // 		}
    // 	}
    // 	res.json({ status : false, message: "Not Found" })	
    // } else {
    // 	res.json(students);
    // }	
});
//Delete Students
app.delete("/deleteStudent/:id", function (req, res) {
    studentModel.findOneAndRemove(req.params.id, function (err, data) {
        res.json(data);
    });
    // for(var i = 0; i < students.length; i++ ){
    // 	if(req.params.id == students[i].id){
    // 		students.splice(i , 1);
    // 		res.json({ status : true })		
    // 		return;
    // 	}
    // }
    //res.json({ status : false, message: "Not Found" })	
});
// Update Students
app.put("/updateStudent/:id?", function (req, res) {
    console.log('request', req.params.id);
    studentModel.findOne({ id: req.params.id }, function (err, data) {
        console.log(err || data);
    });
    var a = {
        id: req.params.id,
        stuName: req.body.stuName,
        fatherName: req.body.fatherName,
        rollNum: req.body.rollNum,
        stuAge: req.body.stuAge,
        gender: req.body.gender,
        Del: req.body.Del,
        update: req.body.update
    };
    // 	console.log('put ki req ', a)
    studentModel.update({ id: req.params.id }, a, function (err, data) {
        console.log(data);
        res.json({ status: true, stud: data });
    });
    // if(req.params.id){		
    // 	console.log('EDIT ', req.body);
    // 	for(var i = 0; i < students.length; i++ ){
    // 		if(req.params.id == students[i].id){
    // 			students[i].stuName = req.body.stuName;
    // 			students[i].fatherName = req.body.fatherName;
    // 			students[i].rollNum = req.body.rollNum;
    // 			students[i].stuAge = req.body.stuAge;
    // 			students[i].gender = req.body.gender;
    // 			console.log(req.body);
    // 			res.json({ status : true, 	stud: students[i] })		
    // 			return;
    // 		}
    // 	}
    // 	res.json({ status : false, message: "Not Found" })	
    // } else {
    // 	res.json({ status : false, message: "Invalid Id" });
    // }	
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    var listeningPort = server.address().port;
    console.log('The server is listening on port: ' + listeningPort);
});
