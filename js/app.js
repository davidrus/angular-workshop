var app = angular.module("app",['ngRoute']);

app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
	$routeProvider.when('/vypis',{templateUrl:'partials/vypis.html'});
	$routeProvider.when('/kontakt',{templateUrl:'partials/kontakt.html'});
	$routeProvider.when('/pridej',{templateUrl:'partials/pridej.html'});
	$routeProvider.otherwise({redirectTo:'/vypis'});
}]);