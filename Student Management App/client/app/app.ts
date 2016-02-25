import {Component , EventEmitter} from "angular2/core";

import {HTTP_PROVIDERS } from 'angular2/http';
import {Http, Response, RequestOptions,Headers} from 'angular2/http';

class NewStudent{
	
	stuName:string;
	fatherName:string;
	rollNum:number;
	stuAge:number;
	gender:string;
	Del: boolean;
	update:boolean;
	id:number;
	
	
	constructor(stuName:string,fatherName:string,rollNum:number,stuAge:number,gender:string,Del :boolean,update:boolean){
		
		
		this.stuName=stuName;
		this.fatherName=fatherName;
		this.rollNum=rollNum;
		this.stuAge=stuAge;
		this.gender=gender;
		this.Del=Del;
		this.update=update;
		this.id=Date.now();
		
		
		
	}
	delete(){
		this.Del = false;
	}
	Update(){
		this.update = false;
	}
	
	
}

@Component({
	selector:".myClass",
	inputs:['student'],
	outputs:['deleteEvent','UpdateRecord'],
	templateUrl: 'StuTable.html',
	
	
	
})

class stuSecondComp {
	student:NewStudent;
	deleteEvent: EventEmitter<NewStudent>;
	
	UpdateRecord: EventEmitter<NewStudent>;
	constructor(){
		this.deleteEvent = new EventEmitter();
		this.UpdateRecord = new EventEmitter();
	}
	delete(){
		console.log(this.student);
		this.deleteEvent.emit(this.student)
	}
	
	Update(){
		console.log(this.student);
		this.UpdateRecord.emit(this.student)
	}
}






@Component({
	selector: 'mainComponent',
	
	directives:[stuSecondComp],
	templateUrl: 'StudentForm.html',
	
	
	
	
})
export class MainComponent{
	
	students: NewStudent[] = [];
	id: number = 0;
	
	constructor(public http:Http){
	this.getStudents();
	}
	getStudents(): void {
	this.http.request('http://localhost:3000/getStudent')
	.subscribe((res:Response)=>{
		console.log(res.json());
		this.students=res.json();
	});
	}
	
	addStudent(stuName:HTMLInputElement,fatherName:HTMLInputElement,rollNum:HTMLInputElement,stuAge:HTMLInputElement,gender:HTMLSelectElement){
		console.log(`Adding StudentName: ${stuName.value} , FatherName: ${fatherName.value} , Roll Number: ${rollNum.value} , Student Age: ${stuAge.value} , Gender: ${gender.value} `)
	 
	 
	 var stuObj = new NewStudent(stuName.value,fatherName.value , parseInt(rollNum.value) , parseInt(stuAge.value),gender.value,true,true);
		console.log(stuObj);
		
		
		let headers:Headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		
		let opts :RequestOptions= new RequestOptions();
		opts.headers =headers;
		
		
		 if(this.id === 0){
		
	 //console.log(stuObj);
	 this.http.post('http://localhost:3000/createStudent',
		JSON.stringify(stuObj),
		 opts )
		.subscribe((res:Response)=>{
			console.log(res);
			// console.log(res.json().stud);
			
	 this.students.push(res.json().stud);
	stuName.value="";
	fatherName.value ="";
	rollNum.value = "";
	stuAge.value ="";
	gender.value="";
	 });
		
	 } else {
		 console.log('cleint edit ', this.id, stuObj)
		 stuObj[this.id] = this.id;
		 console.log(this.students.length,stuObj, this.id)
		 
		  this.http.put('http://localhost:3000/updateStudent/'+this.id,
		JSON.stringify(stuObj),
		 opts )
		.subscribe((res:Response)=>{
		for (var i = 0; i < this.students.length; i++) {
			if(this.students[i].id == this.id){
				console.log('tureeeeeeeeeeeeeeeeeeeeeeeeeee', res.json().stud)
				this.students[i]=res.json().stud;
				console.log('tureeeeeeeeeeeeeeeeeeeeeeeeeee',this.students[i]);
				this.id = 0;
			}
		}
		
	stuName.value="";
	fatherName.value ="";
	rollNum.value = "";
	  stuAge.value ="";
	 gender.value="";
	 });
		 
		

	 }
	 
	this.getStudents();
		
}

deleteStu(student){
	console.log(student)
	this.http.delete('http://localhost:3000/deleteStudent/'+ student.id)
		.subscribe((res:Response)=>{
 		for (var i = 0; i < this.students.length; i++) {
			 if (this.students[i].id == student.id) {
				 this.students.splice(i, 1);
				 break;
			 }
			 
		 }
		 console.log(student);
		 })
}
	
	
	UpdateRec(student){
 		this.id = student.id;
		  console.log(student);
		   document.getElementById('firstName')['value'] = student.stuName;
        document.getElementById('fatherName')['value'] = student.fatherName;
        document.getElementById('rollNum')['value'] = student.rollNum;
        document.getElementById('stuAge')['value'] = student.stuAge;
        document.getElementById('gender')['value'] = student.gender;
		//document.getElementById('stdid')['value']  = student.id;
		
		
			
		}
		//this.deleteStu(student)
		
}


