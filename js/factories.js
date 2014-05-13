app.factory('persons', ['$resource', function($resource){
    var persons = $resource(API + "/persons/:userId",{userId:'@id'},{
        savePut: {method:"put"}
    });
    return persons;
}]);