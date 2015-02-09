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
    bard.verifyNoOutstandingHttpRequests();

    describe('when stub `getAvengers` of the real dataservice', function() {

        beforeEach(function() {
            bard.appModule('app.avengers');
            bard.inject(this, '$controller', '$log', '$q', '$rootScope', 'dataservice');

            sinon.stub(dataservice, 'getAvengers')
                 .returns($q.when(avengers));

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        it('should have title of Avengers', function() {
            expect(controller.title).to.equal('Avengers');
        });

        it('should have called `dataservice.getAvengers` once', function() {
            expect(dataservice.getAvengers).to.have.been.calledOnce;
        });

        it('should have Avengers', function() {
            expect(controller.avengers)
                .to.have.length(avengers.length);
        });

        it('should have logged "Activated"', function() {
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
     *
     *
     *
     *
     *
     *
     *
     *
     * Alternative ways to fake the dataservice dependency
     *
     * The avengers.spec uses a fake vanilla JS dataservice whose
     * 'getAvengers' is mocked with sinon.
     *
     * Here we demonstrate other ways to fake that method with sinon
     */
    describe('when stub `getAvengers` of the real dataservice ... with stubs helper', function() {

        beforeEach(function() {

            bard.appModule('app.avengers');
            bard.inject(this, '$controller', '$q', '$rootScope', 'dataservice');

            // Use when you repeatedly stub this method ... and only this method
            // if you often stub out a bunch of the same methods
            // see the "mockService" example below
            getAvengersSpy = stubs.getAvengers();

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        getAvengersExpectations();
    });

    describe('when monkey patch `getAvengers` of the real dataservice', function() {

        beforeEach(function() {

            bard.appModule('app.avengers');
            bard.inject(this, '$controller', '$q', '$rootScope', 'dataservice');

            // Replace the `getAvengers` method with a spy;
            // almost the same as stubbing `getAvengers`
            dataservice.getAvengers = getAvengersFake();

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        getAvengersExpectations();
    });

    describe('when create fake dataservice with a `getAvengers` stub', function() {

        beforeEach(function() {

            bard.appModule('app.avengers');
            bard.inject(this, '$controller', '$q', '$rootScope');

            // Shows EXACTLY what the controller needs from the service
            // Controller throws if it asks for anything else.
            var dataservice = {
                getAvengers: getAvengersFake()
            };

            var ctorArgs = {dataservice: dataservice};
            controller = $controller('Avengers', ctorArgs);
            $rootScope.$apply();
        });

        getAvengersExpectations();
    });

    describe('when re-register the dataservice with a fake', function() {

        beforeEach(function() {

            // When the service method is widely used, you can
            // re-register the `dataservice` with a fake version.
            // Then enlist it in the appModule where needed as shown below.
            // You would put this function in `bard`
            // N.B.: this service defines only the faked members;
            // a controller throws if it calls anything else.
            function registerFakeDataservice($provide) {
                $provide.service('dataservice', function() {
                    this.getAvengers = getAvengersFake();
                });
            }

            bard.appModule('app.avengers', registerFakeDataservice);
            bard.inject(this, '$controller', '$q', '$rootScope');

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        getAvengersExpectations();
    });

    // demonstrate that the real dataservice is untouched
    // by distortions of it in other tests; no cross-test pollution
    describe('when next inject the real dataservice (no harm from previous faking)', function() {

        beforeEach(function () {
            bard.appModule('app.avengers');
            bard.inject(this, 'dataservice');
        });

        it('has the real `getAvengers` method', function() {
            // In this test we inspect the method body to prove
            // we've got the real service method, not a fake.
            // The real method calls $http
            var fn = dataservice.getAvengers.toString();
            expect(fn).to.match(/\$http/);
        });

        it('has `getAvengersCast` method', function() {
            expect(dataservice).has.property('getAvengersCast');
        });
    });

    describe('when decorate the real dataservice with a stub `getAvengers`', function() {

        beforeEach(function() {

            function decorateDataservice($provide) {
            // When the service method is widely used, you can
            // decorate the real `dataservice` methods with
            // stubbed versions such as `getAvengers`.
            // Then enlist it in the appModule where needed as shown below.
            // You would put this function in `bard`
            // N.B.: this service leaves other real members intact
                $provide.decorator('dataservice', function($delegate) {
                    $delegate.getAvengers = getAvengersFake();
                    return $delegate;
                });
            }

            bard.appModule('app.avengers', decorateDataservice);
            bard.inject(this, '$controller', '$q', '$rootScope');

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        getAvengersExpectations();
    });

    describe('when fake the server\'s response with $httpBackend', function() {

        beforeEach(function() {
            bard.appModule('app.avengers');
            bard.inject(this, '$controller', '$q', '$rootScope', '$httpBackend', 'dataservice');

            // when `dataservice.getAvengers` sends GET request
            // simulate the server's JSON response
            $httpBackend
                .when('GET', '/api/maa')
                .respond(200, avengers);

            getAvengersSpy = sinon.spy(dataservice, 'getAvengers');

            controller = $controller('Avengers');
            $httpBackend.flush();
        });

        bard.verifyNoOutstandingHttpRequests();

        getAvengersExpectations();
    });

    describe('when stub all dataservice members with mockService', function() {

        beforeEach(function() {

            bard.appModule('app.avengers');
            bard.inject(this, '$controller', '$q', '$rootScope', 'dataservice');

            // Mock multiple service members with a single configuration
            // Every service function is stubbed.
            // The `_default` is the stubbed return for every unnamed service function
            // You could put common stub configurations in stubs.js, e.g.

            // stubs.happyService();
            bard.mockService(dataservice, {
                getAvengers: $q.when(avengers),
                ready:       $q.when(dataservice),
                _default:    $q.when([])
            });

            getAvengersSpy = dataservice.getAvengers; // it's a spy!

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        getAvengersExpectations();

        //// tests of the mocked dataservice, not the controller ////

        it('can call fake `dataservice.getAvengersCast`', function() {
            dataservice.getAvengersCast().then(function(cast) {
                expect(cast).to.have.length(0);
            });
            $rootScope.$apply();
            // verify this is actually a spy
            expect(dataservice.getAvengersCast).to.have.been.calledOnce;
        });

        it('can call fake `dataservice.ready`', function() {
            dataservice.ready().then(function(data) {
                expect(data).to.equal(dataservice);
            });
            $rootScope.$apply();
            // verify this is actually a spy
            expect(dataservice.ready).to.have.been.calledOnce;
        });
    });

    describe('when stub all dataservice members with canned, failing mockService', function() {

        beforeEach(function() {

            bard.appModule('app.avengers');
            bard.inject(this, '$controller', '$log', '$q', '$rootScope', 'dataservice');
            stubs.sadService();

            controller = $controller('Avengers');
            $rootScope.$apply();
        });

        it ('`dataservice.getAvengers` was called', function() {
            expect(dataservice.getAvengers).to.have.been.calledOnce;
        });

        it('have no avengers because `dataservice.getAvengers` failed', function() {
            expect(controller.avengers).to.have.length(0);
        });

        it('should have logged activation failure as error', function() {
            expect($log.error.logs[0]).to.match(/doomed/);
        });

        //// tests of the mocked dataservice, not the controller ////

        it('calling fake `dataservice.getAvengersCast` fails', function() {
            dataservice.getAvengersCast()
                .then(success)
                .catch(function(err) {
                    expect(err).to.match(/doomed/);
                });
            $rootScope.$apply();
            // verify this is actually a spy
            expect(dataservice.getAvengersCast).to.have.been.calledOnce;
        });

        it('calling fake `dataservice.ready` fails', function() {
            dataservice.ready()
                .then(success)
                .catch(function(err) {
                    expect(err).to.match(/doomed/);
                });
            $rootScope.$apply();
            // verify this is actually a spy
            expect(dataservice.ready).to.have.been.calledOnce;
        });

        function success(data) {
            expect('should have failed').to.be.false;
        }
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
