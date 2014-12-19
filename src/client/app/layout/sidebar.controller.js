(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    /* @ngInject */
    function Sidebar($route, routehelper) {
        var vm = this;
        vm.isCurrent = isCurrent;
        //vm.sidebarReady = function(){console.log('done animating menu')}; // example

        activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            vm.navRoutes = routehelper.getRoutes()
            .filter(function(r) {
                return r.settings && r.settings.nav;
            })
            .sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route || !route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
})();
