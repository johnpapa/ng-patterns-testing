/* jshint -W117, -W030 */
describe('layout sidebar', function () {
    var controller;

    beforeEach(function() {
        // Setup for entire app because each feature module adds its own routes
        // 'templates' populates $templateCache with all views
        // so that tests don't try to retrieve view templates from the server.
        module('app', 'templates', bard.fakeToastr);
        bard.inject('$controller', '$location', '$rootScope', '$route');
    });

    beforeEach(function () {
        controller = $controller('Sidebar');
    });

    it('before navigating, isCurrent() should NOT return `current`', function () {
        expect(controller.isCurrent({title: 'invalid'})).not.to.equal('current');
    });

    // Confirm that, after navigating successfully,
    // controller.isCurrent() returns the class name `current`
    // for the router's current route (the browser's current address)
    it('after going to `/`, isCurrent() should return `current`', function () {
        $location.path('/');
        $rootScope.$apply();
        expect(controller.isCurrent($route.current)).to.equal('current');
    });

    it('after going to `/avengers`, isCurrent() should return `current`', function () {
        $location.path('/avengers');
        $rootScope.$apply();
        expect(controller.isCurrent($route.current)).to.equal('current');
    });

    it('after going to an invalid route, isCurrent() should NOT return `current`', function () {
        $location.path('/invalid');
        $rootScope.$apply();
        expect(controller.isCurrent({title: 'invalid'})).not.to.equal('current');
    });
});