app.controller("ListCtrl",["$scope",function($scope){
	var data = [{
		'name': 'David Rus',
		'id': 1
	},{
		'name': 'Josef Šíma',
		'id': 2
	},{ 
		'name': 'Marek Fojtl',
		'id':3
	}];
	$scope.data = data;
}]);

app.controller("DetailCtrl",['$scope', '$routeParams', function($scope,$routeParams){
	$scope.detailId = $routeParams.id;
}]);