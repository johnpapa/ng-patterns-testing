/* jshint -W117, -W030 */
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
        var $scope; // we'll examine inside expectations

        beforeEach(inject(function($controller) {
            // controller constructor needs a $scope
            // create and pass to $controller factory via ctorArgs
            $scope = {}; 
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



        /*
        // You'll see this alternative style in many samples.
        beforeEach(inject(function($controller, $rootScope) {
            // controller constructor needs a $scope; create one from $rootScope
            $scope = $rootScope; //or $scope = $rootScope.new() 
            // ... do work ...
        }

        // Some might say passing a "real" $scope
        // is "safer" because your controller 
        // may call some service on $rootScope.
        // If it did, your test MIGHT pass whereas it would surely fail w/ a fake.
        // They claim this makes the test a less brittle 
        // and you don't have to know what your controller does w/ $scope
        //
        // I prefer to use a "real" $scope only if I KNOW that
        // the controller uses a scope service. AND 
        // Writing the test w/o a real scope makes it clear that
        // my test is not vulnerable to a basket full of $scope dependencies.
        */
    });

});