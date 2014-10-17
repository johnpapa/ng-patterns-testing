/* jshint -W117, -W030 */
describe('Midway: view requests', function() {
    var tester;

    beforeEach(function() {
        tester = ngMidwayTester('app');
    });
    afterEach(function () {
        if (tester) { tester.destroy(); }
    });

    beforeEach(function() {
        module('app', specHelper.fakeLogger);
    });

    it('should go to the dashboard by default', function(done) {
        tester.visit('/', function() {
            expect(tester.viewElement().html()).to.contain('id="dashboard-view"');
            done();
        });
    });

    it('should have a working avengers request', function(done) {
        tester.visit('/avengers', function() {
            expect(tester.viewElement().html()).to.contain('title="Avengers"');
            done();
        });
    });
});