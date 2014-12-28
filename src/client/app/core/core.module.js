/* global moment:false */
angular
    .module('app.core', [
        'ngAnimate', 'ngRoute', 'ngSanitize',
        'blocks.exception', 'blocks.logger', 'blocks.router',
        'ngplus'
    ])
    .constant('moment', moment);
