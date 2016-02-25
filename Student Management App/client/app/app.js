System.register(["angular2/core", 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var NewStudent, stuSecondComp, MainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            NewStudent = (function () {
                function NewStudent(stuName, fatherName, rollNum, stuAge, gender, Del, update) {
                    this.stuName = stuName;
                    this.fatherName = fatherName;
                    this.rollNum = rollNum;
                    this.stuAge = stuAge;
                    this.gender = gender;
                    this.Del = Del;
                    this.update = update;
                    this.id = Date.now();
                }
                NewStudent.prototype.delete = function () {
                    this.Del = false;
                };
                NewStudent.prototype.Update = function () {
                    this.update = false;
                };
                return NewStudent;
            })();
            stuSecondComp = (function () {
                function stuSecondComp() {
                    this.deleteEvent = new core_1.EventEmitter();
                    this.UpdateRecord = new core_1.EventEmitter();
                }
                stuSecondComp.prototype.delete = function () {
                    console.log(this.student);
                    this.deleteEvent.emit(this.student);
                };
                stuSecondComp.prototype.Update = function () {
                    console.log(this.student);
                    this.UpdateRecord.emit(this.student);
                };
                stuSecondComp = __decorate([
                    core_1.Component({
                        selector: ".myClass",
                        inputs: ['student'],
                        outputs: ['deleteEvent', 'UpdateRecord'],
                        templateUrl: 'StuTable.html',
                    }), 
                    __metadata('design:paramtypes', [])
                ], stuSecondComp);
                return stuSecondComp;
            })();
            MainComponent = (function () {
                function MainComponent(http) {
                    this.http = http;
                    this.students = [];
                    this.id = 0;
                    this.getStudents();
                }
                MainComponent.prototype.getStudents = function () {
                    var _this = this;
                    this.http.request('http://localhost:3000/getStudent')
                        .subscribe(function (res) {
                        console.log(res.json());
                        _this.students = res.json();
                    });
                };
                MainComponent.prototype.addStudent = function (stuName, fatherName, rollNum, stuAge, gender) {
                    var _this = this;
                    console.log("Adding StudentName: " + stuName.value + " , FatherName: " + fatherName.value + " , Roll Number: " + rollNum.value + " , Student Age: " + stuAge.value + " , Gender: " + gender.value + " ");
                    var stuObj = new NewStudent(stuName.value, fatherName.value, parseInt(rollNum.value), parseInt(stuAge.value), gender.value, true, true);
                    console.log(stuObj);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var opts = new http_1.RequestOptions();
                    opts.headers = headers;
                    if (this.id === 0) {
                        //console.log(stuObj);
                        this.http.post('http://localhost:3000/createStudent', JSON.stringify(stuObj), opts)
                            .subscribe(function (res) {
                            console.log(res);
                            // console.log(res.json().stud);
                            _this.students.push(res.json().stud);
                            stuName.value = "";
                            fatherName.value = "";
                            rollNum.value = "";
                            stuAge.value = "";
                            gender.value = "";
                        });
                    }
                    else {
                        console.log('cleint edit ', this.id, stuObj);
                        stuObj[this.id] = this.id;
                        console.log(this.students.length, stuObj, this.id);
                        this.http.put('http://localhost:3000/updateStudent/' + this.id, JSON.stringify(stuObj), opts)
                            .subscribe(function (res) {
                            for (var i = 0; i < _this.students.length; i++) {
                                if (_this.students[i].id == _this.id) {
                                    console.log('tureeeeeeeeeeeeeeeeeeeeeeeeeee', res.json().stud);
                                    _this.students[i] = res.json().stud;
                                    console.log('tureeeeeeeeeeeeeeeeeeeeeeeeeee', _this.students[i]);
                                    _this.id = 0;
                                }
                            }
                            stuName.value = "";
                            fatherName.value = "";
                            rollNum.value = "";
                            stuAge.value = "";
                            gender.value = "";
                        });
                    }
                    this.getStudents();
                };
                MainComponent.prototype.deleteStu = function (student) {
                    var _this = this;
                    console.log(student);
                    this.http.delete('http://localhost:3000/deleteStudent/' + student.id)
                        .subscribe(function (res) {
                        for (var i = 0; i < _this.students.length; i++) {
                            if (_this.students[i].id == student.id) {
                                _this.students.splice(i, 1);
                                break;
                            }
                        }
                        console.log(student);
                    });
                };
                MainComponent.prototype.UpdateRec = function (student) {
                    this.id = student.id;
                    console.log(student);
                    document.getElementById('firstName')['value'] = student.stuName;
                    document.getElementById('fatherName')['value'] = student.fatherName;
                    document.getElementById('rollNum')['value'] = student.rollNum;
                    document.getElementById('stuAge')['value'] = student.stuAge;
                    document.getElementById('gender')['value'] = student.gender;
                    //document.getElementById('stdid')['value']  = student.id;
                };
                MainComponent = __decorate([
                    core_1.Component({
                        selector: 'mainComponent',
                        directives: [stuSecondComp],
                        templateUrl: 'StudentForm.html',
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MainComponent);
                return MainComponent;
            })();
            exports_1("MainComponent", MainComponent);
        }
    }
});
//# sourceMappingURL=app.js.map