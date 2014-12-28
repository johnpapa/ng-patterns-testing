/* jshint -W117, -W109, -W030 */
//http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html
//https://github.com/yearofmoo-articles/AngularJS-Testing-Article
describe('Server: routing', function() {
    var current; // current route
    var $route;
    var tester;

    beforeEach(function() {
        tester = ngMidwayTester('testerApp', {mockLocationPaths: false});
        $route = tester.inject('$route');
        wrap = bard.wrapWithDone;
    });

    afterEach(function () {
        if (tester) { tester.destroy(); }
    });

    describe('when go to `/`', function() {

        beforeEach(function(done) {
            tester.visit('/', wrap(function() {
                current = $route.current;
            }, done));
        });

        it('the current path should be `/`', function() {
            expect(tester.path()).to.equal('/');
        });
        it('the current controller name should be `Dashboard`', function() {
            expect(current.controller).to.equal('Dashboard');
        });
        it('the view template should be for the `Dashboard` view', function() {
            expect(current.templateUrl).to.match(/dashboard\/dashboard\.html/);
        });
        it('should have loaded the `Dashboard` view', function(done) {
            // When the DOM is ready, assert got the dashboard view
            tester.until(elemIsReady, wrap(hasDashboardView, done));

            function hasDashboardView() {
                var elem = tester.viewElement();
                // look for the tell-tale id with jQuery's find()
                expect(elem.find('#dashboard-view'))
                    .to.have.length(1, elem.html());
            }
        });
    });

    describe('when go to `/avengers`', function() {

        beforeEach(function(done) {
            tester.visit('/avengers', wrap(function() {
                current = $route.current;
            }, done));
        });

        it('the current path should be `/avengers`', function() {
            expect(tester.path()).to.equal('/avengers');
        });
        it('the current controller name should be `Avengers`', function() {
            expect(current.controller).to.equal('Avengers');
        });
        it('the view template should be for the `Avengers` view', function() {
            expect(current.templateUrl).to.match(/avengers\/avengers\.html/);
        });
        it('should have loaded the `Avengers` view', function(done) {
            // When the DOM is ready, assert got the avengers view
            tester.until(elemIsReady, wrap(hasAvengersView, done));

            function hasAvengersView() {
                var elem = tester.viewElement();
                // look for the tell-tale id with vanilla JS
                expect(elem[0].querySelector('#avengers-view'))
                    .to.not.equal(null, elem.html());
            }

        });
    });

    function elemIsReady() {
        return !!tester.viewElement()[0];
    }
});