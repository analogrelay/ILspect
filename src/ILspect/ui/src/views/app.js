System.register(['../aurelia-redux'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_redux_1;
    var App;
    return {
        setters:[
            function (aurelia_redux_1_1) {
                aurelia_redux_1 = aurelia_redux_1_1;
            }],
        execute: function() {
            let App = class App {
                constructor() {
                    this.message = "Hello, World";
                }
            };
            App = __decorate([
                aurelia_redux_1.redux()
            ], App);
            exports_1("App", App);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztZQUlTO2dCQUFBO29CQUNMLFlBQU8sR0FBRyxjQUFjLENBQUM7Z0JBQzdCLENBQUM7WUFBRCxDQUFDO1lBRkQ7Z0JBQUMscUJBQUssRUFBRTttQkFBQTtZQUFDLHFCQUVSLENBQUEiLCJmaWxlIjoidmlld3MvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdG9yZX0gZnJvbSAnLi4vbWFpbic7XG5pbXBvcnQge0FwcFN0YXRlfSBmcm9tICcuLi9zdGF0ZS9hcHAnO1xuaW1wb3J0IHtyZWR1eH0gZnJvbSAnLi4vYXVyZWxpYS1yZWR1eCc7XG5cbkByZWR1eCgpIGV4cG9ydCBjbGFzcyBBcHAge1xuICAgIG1lc3NhZ2UgPSBcIkhlbGxvLCBXb3JsZFwiO1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
