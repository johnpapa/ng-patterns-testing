/* jshint -W117, -W030 */
/**
 *  Demonstrates use of 'httpReal' specHelper module
 *  which restores the ability to make AJAX calls to the backend
 *  while retaining all the goodness of ngMocks.
 *
 *  An alternative to the ngMidwayTester (seen in other Midway tests)
 */

describe('Midway: dataservice requests', function() {
    var dataservice;
    var flush = specHelper.flush;

    beforeEach(module('app', 'httpReal', specHelper.fakeLogger));

    beforeEach(function() {
        inject(function(_dataservice_){
            dataservice = _dataservice_;
            expect(dataservice).not.to.equal(null);           
        });
    });

    describe('getAvengers function', function () {

        it('should return 7 Avengers', function (done) {
            dataservice.getAvengers()
                .then(function(data) {
                    expect(data).not.to.equal(null);
                    expect(data).to.have.length(7);
                })
                .then(done, done);

            flush();
        });

        it('should contain Black Widow', function (done) {
            dataservice.getAvengers()
                .then(function(data) {
                    expect(data).not.to.equal(null);
                    var hasBlackWidow = data.some(function foundHer(avenger) {
                        return avenger.name.indexOf('Black Widow') >= 0;
                    });
                    expect(hasBlackWidow).to.be.true;
                })
                .then(done, done);

            flush();
        });
    });

});