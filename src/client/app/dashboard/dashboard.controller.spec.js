/* jshint -W117, -W030 */
describe('dashboard controller', function() {

    var cast = mockData.getAvengersCast();
    var controller;

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getAvengersCast')
             .returns($q.when(cast));

        controller = $controller('Dashboard');
        $rootScope.$apply();
    });

    it('should be created successfully', function () {
        expect(controller).to.be.defined;
    });

    it('should have title of Dashboard', function () {
        expect(controller.title).to.equal('Dashboard');
    });

    it('should have called `dataservice.getAvengersCast` once', function() {
        expect(dataservice.getAvengersCast).to.have.been.calledOnce;
    });

    it('should have the expected avengers cast', function () {
        expect(controller.cast).to.have.length(cast.length);
    });

    it('should have the expected cast count', function () {
        expect(controller.castCount).to.equal(cast.length);
    });

    it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
    });

    bard.verifyNoOutstandingHttpRequests();
});
