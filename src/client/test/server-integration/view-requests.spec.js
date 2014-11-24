/* jshint -W117, -W030 */
describe('Server: view requests', function() {
    var tester;

    beforeEach(function() {
        tester = ngMidwayTester('midwayTesterApp', {mockLocationPaths: false});
    });
    afterEach(function () {
        if (tester) { tester.destroy(); }
    });

    it('should go to the dashboard by default', function(done) {
        tester.visit('/', function() {
            expect(tester.viewElement().html()).to.contain('id="dashboard-view"');
            done();
        });
    });

    it('should have a working avengers request', function(done) {
        tester.visit('/avengers', function() {
            var elem = tester.viewElement();
            expect(elem.find('#avengers-view')).to.have.length(1, elem.html());
            done();
        });
    });
});