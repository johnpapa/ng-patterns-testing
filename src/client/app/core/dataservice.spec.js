/* jshint -W117, -W030 */
describe('core dataservice', function () {

    beforeEach(function () {
        module('app.core', bard.fakeToastr);
        bard.inject('$httpBackend', '$rootScope', 'dataservice');
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

        it('should return Avengers', function (done) {
            dataservice.getAvengers()
                .then(function(data) {
                    expect(data.length).to.equal(avengers.length);
                })
                .then(done, done);
            $httpFlush();
        });

        it('should contain Black Widow', function (done) {
            dataservice.getAvengers()
                .then(function(data) {
                    var hasBlackWidow = data.some(function (a) {
                        return a.name.indexOf('Black Widow') >= 0;
                    });
                    expect(hasBlackWidow).to.be.true;
                })
                .then(done, done);
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

        it('should return cast', function (done) {
            dataservice.getAvengersCast()
            .then(function(data) {
                expect(data.length).to.equal(cast.length);
            })
            .then(done, done);
            $httpFlush();
        });

        it('should contain Scarlett Johansson', function (done) {
            dataservice.getAvengersCast()
            .then(function(data) {
                var hasScarlett = data.some(function (c) {
                    return c.name === 'Scarlett Johansson';
                });
                expect(hasScarlett).to.be.true;
            })
            .then(done, done);
            $httpFlush();
        });
    });

    describe('ready function', function () {

        it('should return a resolved promise with the dataservice itself', function (done) {
            dataservice.ready()
            .then(function(data) {
                expect(data).to.equal(dataservice);
            })
            .then(done, done);
            $rootScope.$apply(); // no $http so just flush $q
        });
    });
});
