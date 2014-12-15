/*****
 * Alternative ways to fake the dataservice dependency
 *
 * The avengers.spec uses a dataservice whose
 * 'getAvengers' is mocked with sinon.
 *
 * Here we demonstrate other ways to fake that method
 */
/* jshint -W117, -W030 */
describe('avengers controller (alternate)', function() {

    var avengers = mockData.getAvengers();
    var controller, spy;

    describe('when fake the dataservice w/ vanilla JS', function() {

        beforeEach(function() {

            specHelper.appModule('app.avengers');
            specHelper.injector(function($controller, $q, $rootScope) { });

            var dataservice = {
                getAvengers: getAvengersFake()
            };

            var ctorArgs = {dataservice: dataservice};
            controller = $controller('Avengers', ctorArgs);
            $rootScope.$apply();
        });

        getAvengersExpectations();
    });

    describe('when monkey patch `getAvengers` of the real dataservice', function() {

        beforeEach(function() {

            specHelper.appModule('app.avengers');
            specHelper.injector(function($controller, $q, $rootScope, dataservice) { });

            dataservice.getAvengers = getAvengersFake();

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        getAvengersExpectations();
    });

    describe('when re-register the dataservice with a fake', function() {

        beforeEach(function() {

            specHelper.appModule('app.avengers', registerFakeDataservice);

            function registerFakeDataservice($provide) {
                // re-register the `dataservice` with a fake version
                $provide.service('dataservice', function() {
                    this.getAvengers = getAvengersFake();
                });
            }

            specHelper.injector(function($controller, $q, $rootScope) { });

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        getAvengersExpectations();
    });

    // demonstrate that real dataservice is untouched
    // in other tests; no cross-test pollution
    describe('when next inject the real dataservice', function() {

        beforeEach(function () {
            specHelper.appModule('app.avengers');
            specHelper.injector('dataservice');
        });

        it('has the real `getAvengers` method', function() {
            var fn = dataservice.getAvengers.toString();
            // the real one call $http
            expect(fn).to.match(/\$http/);
        });

        it('has `getAvengersCast` method', function() {
            expect(dataservice).has.property('getAvengersCast');
        });
    });

    describe('when decorate the dataservice with a fake `getAvengers`', function() {

        beforeEach(function() {

            specHelper.appModule('app.avengers', decorateDataservice);

            function decorateDataservice($provide) {
                // decorate the real `dataservice`
                // with a fake version of `getAvengers`
                $provide.decorator('dataservice', function($delegate) {
                    $delegate.getAvengers = getAvengersFake();
                    return $delegate;
                });
            }

            specHelper.injector(function($controller, $q, $rootScope) { });

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        getAvengersExpectations();
    });

    describe('when fake the server\'s response with $httpBackend', function() {

        beforeEach(function() {
            specHelper.appModule('app.avengers');
            specHelper.injector(
                function($controller, $q, $rootScope, $httpBackend, dataservice) { });

            // when `dataservice.getAvengers` sends GET request
            // simulate the server's JSON response
            $httpBackend
                .when('GET', '/api/maa')
                .respond(200, avengers);

            spy = sinon.spy(dataservice, 'getAvengers');

            controller = $controller('Avengers');
            $httpBackend.flush();
        });

        getAvengersExpectations();

        specHelper.verifyNoOutstandingHttpRequests();
    });

    /////// helpers /////

    // return a fake `getAvengers` method,
    // wrapped in a sinon.js spy
    function getAvengersFake() {
        spy = sinon.spy(function() {
            return $q.when(avengers);
        });
        return spy;
    }

    function getAvengersExpectations() {

        it ('getAvengers was called', function() {
            expect(spy).to.have.been.calledOnce;
        });

        it('controller has fake Avengers', function() {
            expect(controller.avengers).to.have.length(avengers.length);
        });
    }
});