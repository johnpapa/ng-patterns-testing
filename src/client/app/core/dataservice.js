(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
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

        // THIS PRIME DOES NOTHING
        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
