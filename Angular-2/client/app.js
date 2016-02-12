System.register(["angular2/platform/browser", "angular2/core", 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, http_1, http_2;
    var NewTask, showTable, MainTodo;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            }],
        execute: function() {
            NewTask = (function () {
                function NewTask(User, task, Del) {
                    this.User = User;
                    this.Taskname = task;
                    this.id = Date.now();
                    this.Del = Del;
                }
                NewTask.prototype.delete = function () {
                    this.Del = false;
                };
                return NewTask;
            })();
            showTable = (function () {
                function showTable() {
                    this.deleteEvent = new core_1.EventEmitter();
                }
                showTable.prototype.delete = function () {
                    //this.todo.Del = false;
                    console.log(this.todo);
                    this.deleteEvent.emit(this.todo);
                };
                showTable = __decorate([
                    core_1.Component({
                        selector: '.myClass',
                        host: {
                            class: 'td'
                        },
                        inputs: ['todo'],
                        outputs: ['deleteEvent'],
                        template: "\n\t<td>{{ todo.User }}</td>\n\t<td>{{ todo.Taskname }}</td>\n\t<td> <button class=\"ui orange button\" (click)=\"delete()\">Delete Task</button> </td>\n\t"
                    }), 
                    __metadata('design:paramtypes', [])
                ], showTable);
                return showTable;
            })();
            MainTodo = (function () {
                function MainTodo(http) {
                    this.http = http;
                    this.todos = [];
                    this.getTodos();
                }
                MainTodo.prototype.getTodos = function () {
                    var _this = this;
                    this.loadingTasks = true;
                    this.http.request('http://localhost:3000/api/todo')
                        .subscribe(function (res) {
                        console.log(res.json());
                        setTimeout(function () {
                            _this.todos = res.json();
                            _this.loadingTasks = false;
                        }, 1000);
                    });
                };
                MainTodo.prototype.addTodo = function (user, todo) {
                    var _this = this;
                    console.log("Adding Name: " + user.value + " and Todo: " + todo.value);
                    var obj = new NewTask(user.value, todo.value, true);
                    console.log(obj);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var opts = new http_1.RequestOptions();
                    opts.headers = headers;
                    this.http.post('http://localhost:3000/api/todo', JSON.stringify(obj), opts)
                        .subscribe(function (res) {
                        _this.todos.push(res.json().todo);
                        console.log(res.json);
                        console.log(_this.todos);
                        user.value = "";
                        todo.value = "";
                    });
                };
                MainTodo.prototype.deleteTask = function (todo) {
                    var _this = this;
                    this.http.delete('http://localhost:3000/api/todo/' + todo.id)
                        .subscribe(function (res) {
                        for (var i = 0; i < _this.todos.length; i++) {
                            if (_this.todos[i].id == todo.id) {
                                _this.todos.splice(i, 1);
                                break;
                            }
                        }
                    });
                };
                MainTodo = __decorate([
                    core_1.Component({
                        selector: 'main-Component',
                        host: {
                            class: 'myComp'
                        },
                        directives: [showTable],
                        templateUrl: 'todo.html',
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MainTodo);
                return MainTodo;
            })();
            browser_1.bootstrap(MainTodo, [http_2.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=app.js.map