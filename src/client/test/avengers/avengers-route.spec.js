/* jshint -W117, -W030 */
describe('avengers-route', function () {
    var controller;
    var view = 'app/avengers/avengers.html';

    beforeEach(function() {
        specHelper.appModule('app.avengers');
        specHelper.injector(function($httpBackend, $location, $route) {});
    });

    it('should map /avengers route to avengers View template', function () {
        expect($route.routes['/avengers'].templateUrl).to.equal(view);
    });

    it('should route / to the avengers View', function () {
        $httpBackend.expectGET(view).respond(200);
        $location.path('/avengers');
        specHelper.flush();
        expect($route.current.templateUrl).to.equal(view);
    });

});