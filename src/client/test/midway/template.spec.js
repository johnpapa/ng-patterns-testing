/* jshint -W117, -W030 */
describe('Midway: templates', function() {
    var tester;

    beforeEach(function() {
        tester = ngMidwayTester('app');
    });
    afterEach(function () {
        if (tester) { tester.destroy(); }
    });

    it('should load the template for the avengers view properly',
        function(done) {
            tester.visit('/avengers', function() {
                var current = tester.inject('$route').current;
                var controller = current.controller;
                var template = current.templateUrl;
                expect(template).to.match(/avengers\/avengers\.html/);
                done();
            });
    });

    it('should load the template for the dashboard view properly',
        function(done) {
            tester.visit('/', function() {
                var current = tester.inject('$route').current;
                var controller = current.controller;
                var template = current.templateUrl;
                expect(template).to.match(/dashboard\/dashboard\.html/);
                done();
            });
    });
});