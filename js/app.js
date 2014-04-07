var app = angular.module("app",['ngRoute']);
var API = "http://rus-david.kancelar.seznam.cz";

app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
	$routeProvider.when('/persons',{templateUrl:'partials/persons.html'});
	$routeProvider.when('/persons/:id',{templateUrl:'partials/personDetail.html'});
	$routeProvider.when('/contact',{templateUrl:'partials/contact.html'});
	$routeProvider.when('/add',{templateUrl:'partials/add.html'});
	$routeProvider.otherwise({redirectTo:'/persons'});
}]);