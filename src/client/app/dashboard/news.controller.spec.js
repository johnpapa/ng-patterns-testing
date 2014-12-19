/* jshint -W117, -W030 */
describe('dashboard news controller', function() {

    var controller, $scope;
    var stories = mockData.getNewsStories();

    beforeEach(function() {
        specHelper.appModule('app.dashboard');
        specHelper.injector('$controller', '$interval', '$q', '$rootScope', '$timeout', 'newsService');
    });

    beforeEach(function () {

        sinon.stub(newsService, 'getTopStories')
             .returns($q.when(stories));

        $scope = $rootScope.$new(); // need real $scope for $scope.$on
        controller = $controller('News', {$scope: $scope});
        $rootScope.$apply();
    });

    it('should be created successfully', function () {
        expect(controller).to.be.defined;
    });

    it('should have title of "Marvel News"', function () {
        expect($scope.title).to.equal('Marvel News');
    });

    it('should have one news story until newsService loads stories', function () {
        expect($scope.news).to.be.length(1);
    });

    it('has placeholder story until newsService loads stories', function () {
        var story = $scope.news[0];
        expect(story.description).to.match(/no news/i, 'story.description');
    });

    it('has many stories after newsService loads stories', function () {
        $timeout.flush();
        expect($scope.news).to.have.length.above(1);
    });

    it('refreshes stories periodically', function () {
        // Must know at least the minimum interval;
        // picked big test interval to trigger many refreshes
        $interval.flush(100000);
        expect(newsService.getTopStories.callCount).to.be.above(2);
    });

    it('stops refreshing stories when the controller is destroyed', function () {
        var $destroyEventRaised = false;

        // listen for event when controller (well, its $scope) is destroyed
        $scope.$on('$destroy', function() {
            $destroyEventRaised = true;
        });

        // trigger some newsService activity as time passes
        $timeout.flush();
        $interval.flush(100000);
        var lastCount = newsService.getTopStories.callCount;
        expect(lastCount).to.be.above(2);

        // now destroy the controller's scope (as when "close" its view)
        // the controller should no longer ask for news refreshes
        $scope.$destroy();

        // let more time pass;
        $interval.flush(100000);

        expect($destroyEventRaised).to.equal(true,
            'destroy event raised');

        expect(newsService.getTopStories.callCount).to.equal(lastCount,
            'there should have been no more newsService calls');
    });
});
