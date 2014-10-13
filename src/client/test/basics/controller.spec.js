describe('Basics - controller:', function() {
    'use strict';

    var controller;

    beforeEach(module('basics'));

    describe("'controllerAs' style (no $scope)", function(){
        // Create an instance of the controller (ViewModel) before each test
        beforeEach(inject(function($controller) {
            // '$controller' is an Ng service that makes controller instances
            // 'controller'  is an instance of `basicController`
            controller = $controller('basicController');
        }));

        it('exists', function() {
            expect(controller).to.exist;
        });

        it('has no avengers', function() {
            expect(controller.avengers).to.be.empty;
        });

        it('activates immediately', inject(function($log) {
            // We can only infer that this is true because
            // we know that activation results in a log entry
            // $log has been mocked by ngMocks and can tell us it's been called
            // Confirm that the msg in the first call to $log.debug indicates activation
            expect($log.debug.logs[0]).to.match(/activated/i);
        }));

    });

    describe("'$scoped controller' style ", function(){
        var $scope;

        beforeEach(inject(function($controller, $rootScope) {
            // controller constructor needs a $scope; create one from $rootScope
            $scope = $rootScope;   // $rootScope.new(); is overkill
            var ctorArgs = { $scope: $scope};
            controller = $controller('basicScopedController', ctorArgs);
        }));

        it('exists', function() {
            expect(controller).to.exist;
        });

        it('has no avengers', function() {
            expect($scope.avengers).to.be.empty;
        });

        it('activates immediately', inject(function($log) {
            expect($log.debug.logs[0]).to.match(/activated/i);
        }));

    });

});