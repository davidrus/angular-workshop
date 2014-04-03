var app = angular.module("app",[]);

app.controller("ListCtrl",["$scope",function($scope){
	$scope.data = ['David Rus','Josef Šíma', 'Marek Fojtl'];
}]);
