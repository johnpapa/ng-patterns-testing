/* jshint -W117, -W030 */
describe('layout shell controller', function() {
 
    var controller;
    var $log;         // different from bard 
    var $timeout;     // different from bard 
 
    beforeEach(function() {
        module('app.layout', fakeToastr);
 
        function fakeToastr($provide) {
            $provide.constant('toastr', {
                info: function() {},
                error: function() {},
                warning: function() {},
                success: function() {}
            });
        }
 
        // different from bard - begin
        inject(function($controller, _$log_, _$timeout_) {
            $log = _$log_;
            $timeout = _$timeout_;
            controller = $controller('Shell');
        });
        // different from bard - end
        
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
