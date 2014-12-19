(function() {
    'use strict';

    angular
        .module('app.avengers')
        .controller('Avengers', Avengers);

    /* @ngInject */
    function Avengers(dataservice, logger) {
        var vm = this;
        vm.avengers = [];
        vm.title = 'Avengers';

        activate();

        function activate() {
            return getAvengers()
                .then(function() {
                    logger.info('Activated Avengers View');
                })
                .catch(function(err) {
                    logger.error('Avengers view activation failed: ' + err);
                });
        }

        function getAvengers() {
            return dataservice.getAvengers().then(function(data) {
                vm.avengers = data;
                return data;
            });
        }
    }
})();
