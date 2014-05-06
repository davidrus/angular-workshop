app.service('initCounter',[function () {
    var inits = 0;
    this.init = function(controller) {
        inits++;
        console.log("Init: ", controller, " init summary: ", inits);
    };
}]);