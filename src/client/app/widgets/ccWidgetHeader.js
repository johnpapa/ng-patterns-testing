(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('ccWidgetHeader', ccWidgetHeader);

    function ccWidgetHeader () {
        // jscs:disable validateIndentation
        //Usage:
        //<div data-cc-widget-header title="vm.map.title"></div>
        // Creates:
        // <div data-cc-widget-header=""
        //      title="Avengers Movie"
        //      allow-collapse="true" </div>
        // jscs:enable validateIndentation
        var directive = {
            // link: link,
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: 'app/widgets/widgetheader.html',
            restrict: 'A'
        };
        return directive;

        // function link(scope, element, attrs) {
        //     attrs.$set('class', 'widget-head');
        // }
    }
})();
