(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .service('exception', Exception);

    /* @ngInject */
    function Exception(logger) {
        this.catcher = catcher;

        function catcher(message) {
            return function(reason) {
                logger.error(message, reason);
            };
        }
    }
})();
