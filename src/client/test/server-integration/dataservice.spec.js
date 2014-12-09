/* jshint -W117, -W030 */
/**
 *  Demonstrates use of specHelper's real $http and $q
 *  restoring the ability to make AJAX calls to the server
 *  while retaining all the goodness of ngMocks.
 *
 *  An alternative to the ngMidwayTester
 */

describe('Server: dataservice', function() {
    var dataservice;

    beforeEach(specHelper.asyncModule('app'));

    beforeEach(inject(function(_dataservice_) {
        dataservice = _dataservice_;
    }));

    describe('when call getAvengers', function () {

        it('should get at least 6 Avengers', function (done) {
            dataservice.getAvengers()
                .then(function(data) {
                    expect(data).to.have.length.above(6);
                })
                .then(done, done);
        });

        it('should contain Black Widow', function (done) {
            dataservice.getAvengers()
                .then(function(data) {
                    var hasBlackWidow = data && data.some(function foundHer(avenger) {
                        return avenger.name.indexOf('Black Widow') >= 0;
                    });
                    expect(hasBlackWidow).to.be.true;
                })
                .then(done, done);
        });
    });

    describe('when call getAvengersCast', function () {

        it('should get at least 10 cast members', function (done) {
            dataservice.getAvengersCast()
                .then(function(data) {
                    expect(data).to.have.length.above(10);
                })
                .then(done, done);
        });

        it('should contain Scarlett Johansson', function (done) {
            dataservice.getAvengersCast()
                .then(function(data) {
                    var hasScarlett = data && data.some(function foundHer(avenger) {
                        return avenger.name === 'Scarlett Johansson';
                    });
                    expect(hasScarlett).to.be.true;
                })
                .then(done, done);
        });
    });
});