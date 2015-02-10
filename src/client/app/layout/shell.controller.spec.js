/* jshint -W117, -W030 */
describe('layout shell controller', function() {
    var controller;
    var $log;
    var $timeout;
 
    beforeEach(function() {
        module('app.layout');
 
        inject(function($controller, _$log_, _$timeout_, toastr) {
            // Crazy stuff we do to disable the toastr
            toastr.info = function() {};
            toastr.error = function() {};
            toastr.warning = function() {};
            toastr.success = function() {};
 
            $log = _$log_;
            $timeout = _$timeout_;
            controller = $controller('Shell');
        });
    });
 
    it('should have logged success on activation', function() {
        // passes if ANY of the logs matches
        expect($log.info.logs).to.match(/success/i);
    });
 
    it('should should hide splash after delay', function() {
        var vm = controller;
        expect(vm.showSplash).to.equal(true, 'showSplash before delay');
        $timeout.flush();
        expect(vm.showSplash).to.equal(false, 'showSplash after delay');
    });
});
