/* jshint -W117, -W030 */
describe('dashboard-route', function () {
    var controller;
    var view = 'app/dashboard/dashboard.html';

    beforeEach(function() {
        module('app.dashboard', bard.fakeToastr);
        bard.inject('$location', '$route', '$rootScope', '$templateCache');
        $templateCache.put(view, '');
    });

    it('should map / route to dashboard View template', function () {
        expect($route.routes['/'].templateUrl).
            to.equal('app/dashboard/dashboard.html');
    });

    it('should route / to the dashboard View', function () {
        $location.path('/');
        $rootScope.$apply();
        expect($route.current.templateUrl).to.equal(view);
    });

    it('should route /invalid to the otherwise (dashboard) route', function () {
        $location.path('/invalid');
        $rootScope.$apply();
        expect($route.current.templateUrl).to.equal(view);
    });
});
