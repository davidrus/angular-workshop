var app = angular.module("app",['ngRoute','ngAnimate','ngResource']);
var API = "http://angular-workshop-server.herokuapp.com";

app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
	$routeProvider.when('/persons',{templateUrl:'partials/persons.html', title:"Výpis osob"});
	$routeProvider.when('/persons/add',{templateUrl:'partials/edit.html', title:"Přidání osoby"});
	$routeProvider.when('/persons/edit/:id',{templateUrl:'partials/edit.html', title:"Editace osoby"});
	$routeProvider.when('/persons/:id',{templateUrl:'partials/personDetail.html', title:"Detail osoby"});
	$routeProvider.when('/contact',{templateUrl:'partials/contact.html', title:"Kontaktní informace"});
	$routeProvider.otherwise({redirectTo:'/persons'});
}]);
