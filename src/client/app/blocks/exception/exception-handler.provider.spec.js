/* jshint -W117, -W030 */
describe('blocks.exception:', function() {

    var error;
    var errorPrefix = 'TEST: ';
    var errorRe = new RegExp(errorPrefix);

    beforeEach(function() {
        module('blocks.exception',
            bard.fakeToastr,

            // configure with mock app error prefix
            function(exceptionHandlerProvider) {
                exceptionHandlerProvider.configure(errorPrefix);
            }
        );

        bard.inject(
            function($exceptionHandler, $log, $rootScope) {});

        throwAndCatch();
    });

    it('error thrown within ng is caught and prefixed', function() {
        expect(error.message).to.match(errorRe);
    });

    it('error thrown within ng is logged as an error', function() {
        expect($log.error.logs).to.have.length(1);
        expect($log.error.logs[0][0]).to.match(errorRe);
    });

    function throwAndCatch() {
        try {
            // let ng process the test exception
            // by throwing inside $apply
            $rootScope.$apply(function() {
                throw new Error(mocks.errorMessage);
            });
        }
        catch (ex) {
            error = ex;
        }
    }
});
