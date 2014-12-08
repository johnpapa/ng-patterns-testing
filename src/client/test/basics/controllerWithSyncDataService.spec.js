/* jshint -W117, -W030 */
describe('Basics - controller w/ dependent synchronous dataservice:', function() {
    'use strict';

    var controller;
    var controllerName = 'basicDataController';

    beforeEach(module('basics'));

    describe('when using "real" dataservice', function() {

        beforeEach(inject(function($controller) {
            var createController = function createController() {
                controller = $controller(controllerName);
            };
            expect(createController).to.throw(/way too hard/);
        }));

        it('controller creation fails', function() {
            expect(controller).to.not.exist; // because we trapped failure in beforeEach
        });
    });

    describe('when create controller with ctor args and fake dataservice', function() {

        beforeEach(inject(function($controller) {
            // 'local' values that the $controller service passes to
            //  the constructor instead of values from the injector
            var ctorArgs = {
                // specify a fake service instance whose getAvengers() returns test data
                syncDataservice: {getAvengers: mockData.getMockAvengers}
            };

            controller = $controller(controllerName, ctorArgs);
        }));

        it('has avengers immediately after creation', function() {
            expect(controller.avengers.length).above(1);
        });
    });

    describe('when monkey patch the real dataservice method', function() {
        beforeEach(inject(function($controller, syncDataservice) {

            // replace the problematic 'getAvengers' method with a mock version
            // can't spy on it this way
            syncDataservice.getAvengers = mockData.getMockAvengers;
            controller = $controller(controllerName);
        }));

        it('has avengers immediately after creation', function() {
            expect(controller.avengers.length).above(1);
        });

    });

    describe('when mock the real dataservice method', function() {
        var stub;

        beforeEach(inject(function($controller, syncDataservice) {

            // replace the problematic 'getAvengers' method with a mock version
            stub = sinon.stub(syncDataservice, 'getAvengers', mockData.getMockAvengers);

            controller = $controller(controllerName);
        }));

        it('has avengers immediately after creation', function() {
            expect(controller.avengers.length).above(1);
        });

        it('dataservice.getAvengers was called', function() {
            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('when re-register with mock dataservice', function() {

        beforeEach(module(function($provide) {
            $provide.factory('syncDataservice', mockSyncDataservice);
        }));

        beforeEach(inject(function($controller) {
            controller = $controller(controllerName);
        }));

        it('has avengers immediately after creation', function() {
            expect(controller.avengers.length).above(1);
        });

        // definition of a mock service whose getAvengers() returns test data
        function mockSyncDataservice() {
            return {getAvengers: mockData.getMockAvengers};
        }
    });

});