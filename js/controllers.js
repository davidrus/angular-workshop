app.controller("MainAppCtrl",["$scope", function($scope){
	// změna z routovače
	$scope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute){
		$scope.title = currentRoute.title;
	});

	// změna z controlleru
	$scope.$on("changeTitle", function(event, title){
		$scope.title = title;
	});
}]);

app.controller("ListCtrl",["$scope", "$http", "persons", function($scope, $http, persons){

	persons.query().$promise.then(function(resource){
		$scope.data = resource;
		console.log(resource);
	});
	$scope.filterRole = "";

	$scope.deletePerson = function(personResource,index){
		personResource.$remove({personId:personResource.id}).then(function(resource){
			$scope.data.splice(index,1);
		});
	};

}]);

app.controller("DetailCtrl",['$scope', '$routeParams', '$http', 'persons', function($scope,$routeParams,$http,persons){

	$scope.detailId = $routeParams.id;
	persons.get({personId:$routeParams.id}).$promise.then(function(response){
		$scope.data = response;

		// zavolame signal nahoru, pro zmenu titulku
		$scope.$emit("changeTitle","Detail osoby: " + $scope.data.firstname + " " + $scope.data.surname);
	});

}]);

app.controller("EditCtrl",['$scope', '$routeParams', '$http', '$location', 'persons', function($scope,$routeParams,$http,$location,persons){
	$scope.dataResource = new persons();

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
		persons.get({personId:$routeParams.id}).$promise.then(function(resource){
			$scope.dataResource = resource;
		});

		// ukladani
		$scope.submit = function(){
			$scope.formSubmitted = true; // zviditelnime chyby
			if($scope.myForm.$valid){
				$scope.dataResource.$savePut({personId:$routeParams.id}).then(function(response){
					$location.url("/persons/"+$routeParams.id);
				});
			}
		};

		// mazani
		$scope.deletePerson = function(){
			$scope.dataResource.$remove({personId:$routeParams.id}).then(function(response){
				$location.url("/persons");
			});
		};

	}else{

		$scope.submit = function(){
			$scope.formSubmitted = true; // zviditelnime chyby
			if($scope.myForm.$valid){
				$scope.dataResource.$save().then(function(response){
					$location.url("/persons/"+response.id);
				});
			}
		};

	}

}]);
