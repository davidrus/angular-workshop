app.factory('persons', ['$resource', function($resource){
    var persons = $resource(API + "/persons/:personId",{},{
        savePut: {method:"put"}
    });
    return persons;
}]);