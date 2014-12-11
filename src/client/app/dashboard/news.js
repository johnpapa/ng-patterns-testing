// A $scope controller
// We strongly favor "controller as" style and discourage mixing styles
// We're deviating from our standard in this one case 
// to demonstrate testing of $scope style controllers.
(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('News', News);

    /* @ngInject */
    function News($scope, $interval, $timeout, newsService, logger) {       
        $scope.news = [];
        $scope.title = 'Marvel News';

        activate();
        //////////////////////////
        function activate() {
            $scope.news = [{
                title: 'Marvel Avengers',
                description: 'No news available at this time'
            }];

            // delay first time for demo
            $timeout(getNews, 2000);

            // get fresh news periodically
            $interval(getNews, 10000);
        }

        function getNews() {
            return newsService.getTopStories(5)
                .then(function(news) {
                    $scope.news = news;
                });	    	
        }
    }
})();        