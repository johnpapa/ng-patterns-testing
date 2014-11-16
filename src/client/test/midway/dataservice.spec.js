/* jshint -W117, -W030 */
describe('Midway: dataservice requests', function() {
    var dataservice;
    var tester;

    beforeEach(function() {
        tester = ngMidwayTester('midwayApp');
    });
    afterEach(function () {
        if (tester) { tester.destroy(); }
    });

    beforeEach(function() {
        dataservice = tester.inject('dataservice');
        expect(dataservice).not.to.equal(null);
    });

    describe('getAvengers function', function () {
        it('should return 7 Avengers', function (done) {
            dataservice.getAvengers().then(function(data) {
                expect(data).not.to.equal(null);
                expect(data.length).to.equal(7);
            }).then(done, done);
            // $rootScope.$apply();
        });

        it('should contain Black Widow', function (done) {
            dataservice.getAvengers().then(function(data) {
                expect(data).not.to.equal(null);
                var hasBlackWidow = data.some(function isPrime(element, index, array) {
                    return element.name.indexOf('Black Widow') >= 0;
                });
                expect(hasBlackWidow).to.be.true;
            }).then(done,done);
            // $rootScope.$apply();
        });
    });

});