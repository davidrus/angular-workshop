app.controller("ListCtrl",["$scope", "$http", function($scope, $http){

	$http.get(API + "/persons").then(function(response){
		$scope.data = response.data;
	});

}]);

app.controller("DetailCtrl",['$scope', '$routeParams', '$http', function($scope,$routeParams,$http){

	$scope.detailId = $routeParams.id;
	// tady doplnime http get pozadavek pro nacteni detailu, data posleme do scope.data
	// url: API + /persons/1 - id uzivatele

}]);