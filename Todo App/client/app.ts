import { bootstrap } from "angular2/platform/browser" ;
import { Component, EventEmitter } from "angular2/core" ;
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {HTTP_PROVIDERS } from 'angular2/http';

class NewTask{
	User:string;
	Taskname:string;
	Del:boolean;
	id:number;
	
	
	constructor(User:string,task:string,Del:boolean){
		this.User=User;
		this.Taskname=task;
		this.id= Date.now();
		this.Del = Del;
	}
		delete(){
			this.Del = false;
		}
	}



@Component({
	selector: '.myClass',
	host:{
		class: 'td'
	},
	
	inputs:['todo'],
	outputs : ['deleteEvent'],
	template: `
	<td>{{ todo.User }}</td>
	<td>{{ todo.Taskname }}</td>
	<td> <button class="ui orange button" (click)="delete()">Delete Task</button> </td>
	`	
})
class showTable{
	todo:NewTask;
	
	deleteEvent: EventEmitter<NewTask>;
	constructor(){
		this.deleteEvent= new EventEmitter();
	}
	
	delete(){
		//this.todo.Del = false;
		console.log(this.todo);
		this.deleteEvent.emit(this.todo);
	}
	
}

@Component({
		selector: 'main-Component',
		
		host:{
			class:'myComp'
		},
		directives:[showTable],
		
		templateUrl: 'todo.html',
		
		
})

class MainTodo{
	
	todos: NewTask[]=[];
	 loadingTasks : boolean;
	
	constructor (public http:Http) {
		this.getTodos();
		
	}
	
	
	 getTodos(): void {
        this.loadingTasks = true;
        this.http.request('http://localhost:3000/api/todo')
        .subscribe((res: Response) => {
            console.log(res.json());
            setTimeout(()=>{
                this.todos = res.json();
                this.loadingTasks = false;
            }, 1000)
            
        });
    }
		
	addTodo(user:HTMLInputElement, todo:HTMLInputElement): void{
		console.log(`Adding Name: ${user.value} and Todo: ${todo.value}`);
		
		var obj=new NewTask(user.value,todo.value,true);
		console.log(obj)
		
		let headers:Headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		
		let opts :RequestOptions= new RequestOptions();
		opts.headers =headers;
		
		
		
		
		this.http.post('http://localhost:3000/api/todo',
		JSON.stringify(obj),
		 opts )
		.subscribe((res:Response)=>{
			this.todos.push(res.json().todo);
			console.log(res.json);
			console.log(this.todos);
		user.value="";
		todo.value="";
		});
		
		
		
	}	
	deleteTask(todo){
		
		this.http.delete('http://localhost:3000/api/todo/'+todo.id)
		.subscribe((res:Response)=>{
			
		for(var i = 0; i < this.todos.length; i++)
		{
			if(this.todos[i].id == todo.id){
				this.todos.splice(i, 1);
				break;
			}
		}
		
		})
	}
	
}

bootstrap(MainTodo, [HTTP_PROVIDERS]);