(function() {
    'use strict';

    angular
        .module('app.core')
        .service('dataservice', Dataservice);

    /* @ngInject */
    function Dataservice($http, $q, exception, logger) {
        var readyPromise;
        
        this.getAvengers     = getAvengers;
        this.getAvengersCast = getAvengersCast;
        this.ready           = ready;

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

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app") 
                // before showing the first view.                
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(true);
            }
            return readyPromise; 
        }

        function ready(nextPromises) {
            return getReady()
                .then(function() { 
                    return nextPromises ? readyPromise : $q.all(nextPromises); 
                })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
