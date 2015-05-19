/* jshint -W117, -W030 */
describe('core dataservice', function () {

    var $httpFlush;

    beforeEach(function () {
        module('app.core', bard.fakeToastr);
        bard.inject(this, '$httpBackend', '$rootScope', 'dataservice');
        $httpFlush = $httpBackend.flush;
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function() {
        expect(dataservice).not.to.equal(null);
    });

    describe('when call getAvengers', function () {
        var avengers;
        beforeEach(function() {
            avengers = mockData.getAvengers();
            $httpBackend.when('GET', '/api/maa')
                        .respond(200, avengers);
        });

        it('should return Avengers', function () {
            dataservice.getAvengers()
                .then(function(data) {
                    expect(data.length).to.equal(avengers.length);
                });
            $httpFlush();
        });

        it('should contain Black Widow', function () {
            dataservice.getAvengers()
                .then(function(data) {
                    var hasBlackWidow = data.some(function (a) {
                        return a.name.indexOf('Black Widow') >= 0;
                    });
                    expect(hasBlackWidow).to.be.true;
                });
            $httpFlush();
        });
    });

    describe('when call getAvengersCast', function () {
        var cast;
        beforeEach(function() {
            cast = mockData.getAvengersCast();
            $httpBackend.when('GET', '/api/maaCast')
                        .respond(200, cast);
        });

        it('should return cast', function () {
            dataservice.getAvengersCast()
            .then(function(data) {
                expect(data.length).to.equal(cast.length);
            });
            $httpFlush();
        });

        it('should contain Scarlett Johansson', function () {
            dataservice.getAvengersCast()
            .then(function(data) {
                var hasScarlett = data.some(function (c) {
                    return c.name === 'Scarlett Johansson';
                });
                expect(hasScarlett).to.be.true;
            });
            $httpFlush();
        });
    });

    describe('ready function', function () {

        it('should return a resolved promise with the dataservice itself', function () {
            dataservice.ready()
            .then(function(data) {
                expect(data).to.equal(dataservice);
            });
            $rootScope.$apply(); // no $http so just flush $q
        });
    });
});
