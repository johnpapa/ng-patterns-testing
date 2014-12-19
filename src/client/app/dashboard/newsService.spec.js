/* jshint -W117, -W030 */
describe('dashboard newsService', function () {

    var flush;

    beforeEach(function () {
        specHelper.appModule('app.dashboard');
        specHelper.injector('$timeout', 'newsService');

        // We know that the newsService is actually a fake
        // so we don't bother pretending we need $httpBackend
        // as we do in dataservice.spec. 

        // $timeout is used to simulate latency so we'll need 
        // $timeout flush rather than $httpBackend flush 
        flush = $timeout.flush;    
    });


    describe('#getTopStories', function() {         

        it('should return 3 stories when called w/ no args', function(done) {
            newsService.getTopStories()
            .then(function(stories) {

                expect(stories).to.have.length(3);

            }).then(done, done);
            flush();
        });

        it('should return 1 story when called w/ 1', function(done) {
            newsService.getTopStories(1)
            .then(function(stories) {

                expect(stories).to.have.length(1);

            }).then(done, done);
            flush();
        });

        it('should return 1 story when called w/ <1', function(done) {
            newsService.getTopStories(0)
            .then(function(stories) {

                expect(stories).to.have.length(1);

            }).then(done, done);
            flush();
        });

        it('should return 5 stories when called w/ 5', function(done) {
            newsService.getTopStories(5)
            .then(function(stories) {

                expect(stories).to.have.length(5);

            }).then(done, done);
            flush();
        });

        it('should return 5 stories when called w/ > 5', function(done) {
            newsService.getTopStories(6)
            .then(function(stories) {

                expect(stories).to.have.length(5);

            }).then(done, done);
            flush();
        });

        it('should return different story set each call', function(done) {

            // Test could fail if very, very unlucky and service 
            // randomly returned the same stories in same order twice.

            specHelper.injector('$q'); // only need $q in this test.
            $q.all([
                newsService.getTopStories(5), 
                newsService.getTopStories(5)
            ])
            .then(function(resolveds) {
                var firstSet  = resolveds[0];
                var secondSet = resolveds[1];
                var areDifferent = firstSet.some(function(s, i) {
                    // is   the i-th story of the 1st set different
                    // from the i-th story of the 2nd set
                    return secondSet[i] !== s;
                });
                expect(areDifferent).to.be.true;
            })
            .then(done, done);

            flush();
        });
    });

});    
