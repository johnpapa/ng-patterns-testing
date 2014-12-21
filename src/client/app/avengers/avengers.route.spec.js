/* jshint -W117, -W030 */
describe('avengers-route', function () {
    var controller;
    var view = 'app/avengers/avengers.html';

    beforeEach(function() {
        module('app.avengers', bard.fakeToastr);
        bard.inject('$location', '$route', '$rootScope', '$templateCache');
        $templateCache.put(view, '');
    });

    it('should map /avengers route to avengers View template', function () {
        expect($route.routes['/avengers'].templateUrl).to.equal(view);
    });

    it('should route / to the avengers View', function () {
        $location.path('/avengers');
        $rootScope.$apply();
        expect($route.current.templateUrl).to.equal(view);
    });
});
