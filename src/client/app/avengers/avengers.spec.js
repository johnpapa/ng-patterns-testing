/* jshint -W117, -W030 */
describe('avengers controller', function() {

    var avengers = mockData.getAvengers();
    var controller, spy;

    beforeEach(function() {
        specHelper.appModule('app.avengers');
        specHelper.injector(function($controller, $log, $q, $rootScope, dataservice) { });
    });

    beforeEach(function () {
        spy = sinon.stub(dataservice, 'getAvengers')
             .returns($q.when(avengers));

        controller = $controller('Avengers');
        $rootScope.$apply(); // flush $q
    });

    it('should be created successfully', function () {
        expect(controller).to.be.defined;
    });

    it('should have title of Avengers', function() {
        expect(controller.title).to.equal('Avengers');
    });

    it('should have called `dataservice.getAvengers`', function() {
        expect(spy).to.have.been.calledOnce;
    });

    it('should have Avengers', function() {
        expect(controller.avengers)
            .to.have.length(avengers.length);
    });

    it('should have logged "Activated"', function() {
        // passes if ANY of the logs matches
        expect($log.info.logs).to.match(/Activated/);
    });

    specHelper.verifyNoOutstandingHttpRequests();
});