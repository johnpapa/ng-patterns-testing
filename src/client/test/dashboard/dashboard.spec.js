/* jshint -W117, -W030 */
describe('dashboard controller', function() {

    var cast = mockData.getAvengersCast(); 
    var controller;

    beforeEach(function() {
        specHelper.appModule('app.dashboard');
        specHelper.injector(function($controller, $log, $q, $rootScope, dataservice) { });
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

    it('should have news', function () {
        expect(controller.news).to.not.be.empty;
    });

    it('should have the expected avengers cast', function () {
        expect(controller.cast).to.have.length(cast.length);
    });

    it('should have the expected cast count', function () {
        expect(controller.castCount).to.equal(cast.length);
    });

    it('should have logged "Activated"', function() {
        // passes if ANY of the logs matches
        expect($log.info.logs).to.match(/Activated/);
    });
    
    specHelper.verifyNoOutstandingHttpRequests();
});