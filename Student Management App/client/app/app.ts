import {Component} from "angular2/core";

class NewStudent{
	
	stuName:string;
	fatherName:string;
	stuID : number;
	stuAge:number;
	gender:string;
	
	constructor(stuName:string,fatherName:string,stuID:number,stuAge:number,gender:string){
		
		
		this.stuName=stuName;
		this.fatherName=fatherName;
		this.stuID=stuID;
		this.stuAge=stuAge;
		this.gender=gender;
		
	}
}








@Component({
	selector: 'mainComponent',
	templateUrl: 'StudentForm.html',
	
	
	
	
})
export class MainComponent{
	
	addStudent(stuName:HTMLInputElement,fatherName:HTMLInputElement,stuID:HTMLInputElement,stuAge:HTMLInputElement,gender:HTMLSelectElement){
		console.log(`Adding StudentName: ${stuName.value} , FatherName: ${fatherName.value} , Student ID: ${stuID.value} Student Age: ${stuAge.value} , Gender: ${gender.value } `)
	}
	
}

