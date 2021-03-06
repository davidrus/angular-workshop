app.controller("MainAppCtrl",["$scope", 'initCounter', function($scope, initCounter){
	initCounter.init("MainAppCtrl");
	// změna z routovače
	$scope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute){
		$scope.title = currentRoute.title;
	});

	// změna z controlleru
	$scope.$on("changeTitle", function(event, title){
		$scope.title = title;
	});
}]);

app.controller("ListCtrl",["$scope", "$http", "persons", 'initCounter', function($scope, $http, persons, initCounter){
	initCounter.init("ListCtrl");

	persons.query().$promise.then(function(resource){
		$scope.data = resource;
	});
	$scope.filterRole = "";

	$scope.deletePerson = function(personResource,index){
		personResource.$remove().then(function(resource){
			$scope.data.splice(index,1);
		});
	};

}]);

app.controller("DetailCtrl",['$scope', '$routeParams', '$http', 'persons', 'initCounter', function($scope,$routeParams,$http,persons, initCounter){
	initCounter.init("DetailCtrl");

	$scope.detailId = $routeParams.id;
	persons.get({userId:$routeParams.id}).$promise.then(function(response){
		$scope.data = response;

		// zavolame signal nahoru, pro zmenu titulku
		$scope.$emit("changeTitle","Detail osoby: " + $scope.data.firstname + " " + $scope.data.surname);
	});

}]);

app.controller("EditCtrl",['$scope', '$routeParams', '$http', '$location', 'persons', 'initCounter', function($scope,$routeParams,$http,$location,persons, initCounter){
	initCounter.init("EditCtrl");
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
		persons.get({userId:$routeParams.id}).$promise.then(function(resource){
			$scope.dataResource = resource;
		});

		// ukladani
		$scope.submit = function(){
			$scope.formSubmitted = true; // zviditelnime chyby
			if($scope.myForm.$valid){
				$scope.dataResource.$savePut().then(function(response){
					$location.url("/persons/"+$routeParams.id);
				});
			}
		};

		// mazani
		$scope.deletePerson = function(){
			$scope.dataResource.$remove({userId:$routeParams.id}).then(function(response){
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
