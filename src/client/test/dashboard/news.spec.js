/* jshint -W117, -W030 */
describe('news controller', function() {

    var controller, stories, $scope;

    beforeEach(function() {
        specHelper.appModule('app.dashboard');
        specHelper.injector(
            function($controller, $q, $rootScope, $timeout, newsService) { });
    });

    beforeEach(function () {
        stories = mockData.getNewsStories();
        sinon.stub(newsService, 'getTopStories')
             .returns($q.when(stories));

        $scope = {}; // traditionally = $rootScope.$new()
        controller = $controller('News', {$scope: $scope});
        $rootScope.$apply();
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
        inject(function($interval){              
            $interval.flush(100000);        
        });

        expect(newsService.getTopStories.callCount).to.be.above(2);
    });

});