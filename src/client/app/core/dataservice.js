(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getAvengers: getAvengers,
            getAvengersCast: getAvengersCast,
            ready: ready
        };

        return service;

        function getAvengers() {
            return $http.get('/api/maa')
                .then(function (response) {
                    return response.data;
                })
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                });
        }

        function getAvengersCast() {
            return $http.get('/api/maaCast')
                .then(function (response) {
                    return response.data;
                })
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAvengersCast')(message);
                });
        }

        function prime() {
            if (!primePromise) {
                // Apps often pre-fetch session data ("prime the app") 
                // before showing the first view.                
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed data');
                primePromise = $q.when(true);
            }
            return primePromise; 
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();
            return readyPromise
                .then(function() { 
                    return nextPromises ? readyPromise : $q.all(nextPromises); 
                })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
