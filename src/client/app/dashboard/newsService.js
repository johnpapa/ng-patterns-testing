// Get news about Marvel stuff. Only needed in Dashboard.
(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .service('newsService', NewsService);

    /* @ngInject */
    function NewsService($q, $timeout, exception, logger) {
        this.getTopStories  = getTopStories;

        ///////////////////////
        function getTopStories(count) {
            count = (count == null) ? 3 : count;
            var deferred = $q.defer();
            // simulate 1/2 second latency
            $timeout(function() {
                deferred.resolve(topStories(count));
            }, 500);
            return deferred.promise;
        }

        // Test data. Source: http://marvel.com/news/
        function topStories(count) {
            count = Math.max(1, Math.min(count, 5));
            var stories = [
                {title: 'Avengers Movies',
                 description: 'The Avengers: Age of Ultron opens in U.S. theaters on May 1st'},
                {title: 'Avengers Romance',
                 description: 'Ooo la la: are Dr. Banner and Natasha getting busy?'},
                {title: 'Marvel PSA',
                 description: 'Earth\'s Heroes Take a Stand in Avengers: No More Bullying #1'},
                {title: 'Marvel TV',
                 description: 'Marvel\'s Agent Carter Debriefs Her First 2 Missions'},
                {title: 'Marvel Comics',
                 description: 'Thor: Meet the new female hero who will wield Mjolnir!'},
                {title: 'Marvel Netflix',
                 description: 'Krysten Ritter to Star in Marvel\'s A.K.A. Jessica Jones'},
                {title: 'Marvel Movies',
                 description: 'Benedict Cumberbatch to Play Doctor Strange'},
                {title: 'Marvel Merchandise',
                 description: 'Let Some Gamma Rays Into Your Life With Hulk Collectibles'},
                {title: 'Marvel Animated',
                 description: 'Spidey Fights Visions of the Future'},
                {title: 'Marvel TV',
                 description: 'Agent Skye Faces Off Against A Familiar Foe'},
                {title: 'Marvel Music',
                 description: 'Guardians of the Galaxy "Awesome Mix Vol. 1"' +
                    ' Is Certified Awesome by the Grammys'}
            ];

            var len = stories.length, results = [];
            while (results.length < count) {
                var story = stories[Math.floor(Math.random() * len)];
                if (results.indexOf(story) === -1) {
                    results.push(story);
                }
            }
            return results;
        }
    }
})();
