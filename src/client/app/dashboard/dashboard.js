(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    /* @ngInject */
    function Dashboard(dataservice, logger) {
        var vm = this;
        vm.castCount = 0;
        vm.cast = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            return getAvengersCast().then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getAvengersCast() {
            return dataservice.getAvengersCast().then(function(data) {
                vm.cast = data;
                vm.castCount = data.length;
                return data;
            });
        }
    }
})();
