/* jscs: disable */
/*
 * Source for the "Basics" tests
 */

(function() {
    'use strict';

	  /* Module */
    var basics = angular.module('basics', []);






    /* 'mathService' as service */

    basics.service('mathService', MathService);
    function MathService() {
        /* jshint -W007 */
        // add two values, even if they are strings
        this.add = function(a, b) {return +(a || 0) + +(b || 0);};

        // multiply two values, even if they are strings
        this.multiply = function(a, b) {return +(a || 0) * +(b || 1);};
        /* jshint +W007 */

    }





	  /* 'calcService' as factory*/

    basics.factory('calcService', calcService);

    // "factory" (AKA "service") to test
    // Depends upon the Angular $log service
    function calcService($log, mathService) {
        return {
            calc: calc
        };
        ///////////
        function calc(input, previousOutput) {
            var result = mathService.add(input, previousOutput);

            // use the dependency
            $log.debug('calc(' + input + ', ' + previousOutput + ') => '+ result);

            return result;
        }
    }








    /* 'config' value - typically constants used throughout the app*/

    basics.value('config', {
        // the base Uri for server api calls
        apiBaseUri: '/api/marvel/',
        appTitle:   'Basic Avengers'
    });










    /* 'basicController' controller (ViewModel), controllerAs-style */

    basics.controller('basicController', basicController);

    function basicController($log) {
        /* jshint validthis:true */
        var vm = this;
        vm.avengers = [];
        vm.title = 'Avengers Listing';

        activate();
        ///////////
        function activate() {
            $log.debug(vm.title + ' controller activated');
        }
    }









    /* 'basicScopedController' controller (legacy) */

    basics.controller('basicScopedController', basicScopedController);

    function basicScopedController($scope, $log) {
        $scope.avengers = [];
        $scope.title = 'Avengers Listing';

        activate();
        ///////////
        function activate() {
            $log.debug($scope.title + ' scoped controller activated');
        }
    }








	  /* 'basicDataController' controller (ViewModel) */

    basics
    	.controller('basicDataController', basicDataController)
    	.factory('syncDataservice', syncDataservice);


    function basicDataController($log, syncDataservice) {
        /* jshint validthis:true */
        var vm = this;
        vm.avengers = [];
        vm.title = 'Avengers II Listing';

        activate();
        ///////////
        function activate() {
            vm.avengers = syncDataservice.getAvengers();
            $log.debug(vm.title + ' controller activated');
        }
    }


    // imagine this is the REAL dataservice
    function syncDataservice() {
        return {
            getAvengers: getAvengers
        };
        ///////////
        function getAvengers() {
            throw new Error('getting Avengers is way too hard');
        }
    }







	  /* 'basicAsyncDataController' controller (ViewModel) */

    basics
    	.controller('basicAsyncDataController', basicAsyncDataController)
    	.factory('asyncDataservice', asyncDataservice);

    function basicAsyncDataController($log, asyncDataservice) {
        /* jshint validthis:true */
        var vm = this;
        vm.avengers = [];
        vm.title = 'Avengers III Listing';

        activate();
        ///////////
        function activate() {
        	// async dataservice method
            asyncDataservice.getAvengers()
            	.then(function(avengers) {
                	vm.avengers = avengers;
            	});

            $log.debug(vm.title + ' controller activated');
        }
    }

    // imagine this is the REAL dataservice
    function asyncDataservice($http, config) {
        return {
            getAvengers: getAvengers
        };
        ///////////
        function getAvengers() {

            return $http.get(config.apiBaseUri+'avengers')
                .then(function (data) {
                    return data.data[0].data.results;
                })
                .catch(function(message) {
                    throw new Error(
                        'XHR failed to get Avengers\n' + message);
                });
        }
    }







    /* 'config2' constant - which is available in Ng's config phase */

    basics.constant('config2', {
        debugMode:  true,
        foo: 'foo'
    });

    // use constant in config phase
    basics.config(function ($logProvider, config2) {
        $logProvider.debugEnabled(config2.debugMode);
        $logProvider.foo = config2.foo;
    });

}());
/* jscs: enable */
