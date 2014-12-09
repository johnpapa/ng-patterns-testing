(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    /* @ngInject */
    function Dashboard($q, dataservice, logger) {
        var vm = this;

        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.castCount = 0;
        vm.cast = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getAvengersCast()];
            return $q.all(promises).then(function() {
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
