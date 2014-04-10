app.controller("MainAppCtrl",["$rootScope", function($rootScope){
	$rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute){
		$rootScope.title = currentRoute.title;
	});	
}]);

app.controller("ListCtrl",["$scope", "$http", function($scope, $http){

	$scope.filterRole = "";

	$http.get(API + "/persons").then(function(response){
		$scope.data = response.data;	
	});

	$scope.deletePerson = function(id,index){
		$http.delete(API + "/persons/" + id).then(function(response){
			$scope.data.splice(index,1);
		});
	};

}]);

app.controller("DetailCtrl",['$rootScope', '$scope', '$routeParams', '$http', function($rootScope,$scope,$routeParams,$http){

	$scope.detailId = $routeParams.id;
	$http.get(API + "/persons/" + $routeParams.id).then(function(response){
		$scope.data = response.data;
		$rootScope.title = "Detail osoby: " + response.data.firstname + " " + response.data.surname;
	});

}]);

app.controller("EditCtrl",['$scope', '$routeParams', '$http', '$location', function($scope,$routeParams,$http,$location){

	$scope.roles = [
		{
			id:1,
			name:"Bachař"
		},{
			id:2,
			name:"Vězeň"		
		}
	];

	if(!!$routeParams.id){

		$scope.edit = true;
		$http.get(API + "/persons/" + $routeParams.id).then(function(response){
			$scope.data = response.data;
		});

		// ukladani
		$scope.submit = function(){
			$scope.formSubmitted = true; // zviditelnime chyby
			if($scope.myForm.$valid){
				$http.put(API + "/persons/" + $routeParams.id, $scope.data).then(function(response){
					$location.url("/persons/"+$routeParams.id);
				});		
			}
		};

		// mazani
		$scope.deletePerson = function(){
			$http.delete(API + "/persons/" + $routeParams.id).then(function(response){
				$location.url("/persons");
			});
		};

	}else{

		$scope.submit = function(){
			$scope.formSubmitted = true; // zviditelnime chyby
			if($scope.myForm.$valid){
				$http.post(API + "/persons", $scope.data).then(function(response){
					$location.url("/persons/"+response.data.id);
				});
			}
		};

	}

}]);
