/* jshint -W117, -W030 */
describe('avengers controller', function() {

    var avengers, controller, getAvengersSpy;

    beforeEach(function() {
        // stay fresh! No cross-test pollution.
        avengers       = mockData.getAvengers();
        controller     = undefined;
        getAvengersSpy = undefined;
    });

    // no lingering http requests at the end of a test
    specHelper.verifyNoOutstandingHttpRequests();

    describe('when fake the dataservice in vanilla JS', function() {

        var dataservice;
        beforeEach(function() {

            specHelper.appModule('app.avengers');
            specHelper.injector(function($controller, $log, $q, $rootScope) { });

            dataservice = {
                getAvengers: getAvengersFake() // fake is also a spy
            };

            var ctorArgs = {dataservice: dataservice};
            controller = $controller('Avengers', ctorArgs);
            $rootScope.$apply();
        });

        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        it('should have title of Avengers', function() {
            expect(controller.title).to.equal('Avengers');
        });

        it('should have called `dataservice.getAvengers`', function() {
            expect(dataservice.getAvengers).to.have.been.calledOnce;
        });

        it('should have Avengers', function() {
            expect(controller.avengers)
                .to.have.length(avengers.length);
        });

        it('should have logged "Activated"', function() {
            // test passes if ANY of the logs matches
            expect($log.info.logs).to.match(/Activated/);
        });
    });

    /////// helpers /////

    // return a fake `getAvengers` method,
    // wrapped in a sinon.js spy
    function getAvengersFake() {
        getAvengersSpy = sinon.spy(function() {
            return $q.when(avengers);
        });
        return getAvengersSpy;
    }









    /*****
     * Alternative ways to fake the dataservice dependency
     *
     * The avengers.spec uses a fake vanilla JS dataservice whose
     * 'getAvengers' is mocked with sinon.
     *
     * Here we demonstrate other ways to fake that method with sinon
     */
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

    describe('when next inject the real dataservice', function() {
        // demonstrate that real dataservice is untouched
        // in other tests; no cross-test pollution
        beforeEach(function () {
            specHelper.appModule('app.avengers');
            specHelper.injector('dataservice');
        });

        it('has the real `getAvengers` method', function() {
            // inspect the method body;
            // the real version calls $http
            var fn = dataservice.getAvengers.toString();
            expect(fn).to.match(/\$http/);
        });

        it('has `getAvengersCast` method', function() {
            expect(dataservice).has.property('getAvengersCast');
        });
    });

    describe('when decorate the real dataservice with a fake `getAvengers`', function() {

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

            getAvengersSpy = sinon.spy(dataservice, 'getAvengers');

            controller = $controller('Avengers');
            $httpBackend.flush();
        });

        getAvengersExpectations();

        specHelper.verifyNoOutstandingHttpRequests();
    });

    describe('when stub all dataservice members with mockService', function() {
        var ds; // for brevity

        beforeEach(function() {

            specHelper.appModule('app.avengers');
            specHelper.injector(function($controller, $q, $rootScope, dataservice) { });

            ds = specHelper.mockService(dataservice, {
                getAvengers: $q.when(avengers),
                ready:       $q.when(dataservice),
                _default:    $q.when([])
            });

            getAvengersSpy = ds.getAvengers; // it's a spy!

            controller = $controller('Avengers', {dataservice: ds});
            $rootScope.$apply();
        });

        getAvengersExpectations();

        //// tests of the mocked dataservice, not the controller ////

        it('can call fake `dataservice.getAvengersCast`', function() {
            ds.getAvengersCast().then(function(cast) {
                expect(cast).to.have.length(0);
            });
            $rootScope.$apply();
            // verify this is actually a spy
            expect(ds.getAvengersCast).to.have.been.calledOnce;
        });

        it('can call fake `dataservice.ready`', function() {
            ds.ready().then(function(data) {
                expect(data).to.equal(ds);
            });
            $rootScope.$apply();
            // verify this is actually a spy
            expect(ds.ready).to.have.been.calledOnce;
        });
    });

    /////// helpers /////

    function getAvengersExpectations() {

        it ('`dataservice.getAvengers` was called', function() {
            expect(getAvengersSpy).to.have.been.calledOnce;
        });

        it('controller has fake Avengers', function() {
            expect(controller.avengers).to.have.length(avengers.length);
        });
    }
});