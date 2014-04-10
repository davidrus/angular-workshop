var app = angular.module("app",['ngRoute','ngAnimate']);
var API = "http://angular-workshop-server.herokuapp.com";

app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
	$routeProvider.when('/persons',{templateUrl:'partials/persons.html'});
	$routeProvider.when('/persons/add',{templateUrl:'partials/edit.html'});
	$routeProvider.when('/persons/edit/:id',{templateUrl:'partials/edit.html'});
	$routeProvider.when('/persons/:id',{templateUrl:'partials/personDetail.html'});
	$routeProvider.when('/contact',{templateUrl:'partials/contact.html'});
	$routeProvider.otherwise({redirectTo:'/persons'});
}]);