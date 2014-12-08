(function() {
    'use strict';

    angular.module('app.core')
        .factory('config', config)
        .config(toastrConfig)
        .config(configure);


    function config() {
        return {
            //Configure the exceptionHandler decorator
            appErrorPrefix: '[NG-Testing Error] ', 
            appTitle: 'Angular Testing Demo',
            version: '1.0.0'
        };
    } 

    /* @ngInject */
    function configure ($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Testing: ';
        var resolveAlways = { 
            /* @ngInject */
            ready: function(dataservice) {
                return dataservice.ready();
            }
            // ready: ['dataservice', function (dataservice) {
            //    return dataservice.ready();
            // }]
        };
        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }


    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }   
})();
