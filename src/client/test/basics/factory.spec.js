/* jshint -W117, -W030 */
describe('Basics - factory:', function() {
    'use strict';

    var $log, addSpy, calc;

    beforeEach(module('basics'));

    // Get the service
    // Note that ngDI sees the `_`s as escape chars
    // so it know you want $log when the param is _$log_
    beforeEach(
        inject(function(_$log_, mathService, calcService) {
            $log = _$log_;             
            calc = calcService.calc;

            // spy on the dependent mathService's "add" method
            // Learn more about sinon spies: http://sinonjs.org/docs/
            addSpy = sinon.spy(mathService, 'add');

            // invoke the calcService
            calc(42);
        })
    );

    it('"addSpy" heard the call', function(){
        //Learn more about sinon-chai assertions: https://github.com/domenic/sinon-chai
        expect(addSpy).to.have.been.calledOnce;
    });


    it('"add" was called with expected argument', function(){
        expect(addSpy).to.have.been.calledWith(42);
    });

    it('"add" returned expected argument', function(){
        expect(addSpy).returned(42);
    });

    // When dependency could be called multiple times
    // and we're looking for a particular use case
    it('"add" was called a particular way', function(){
        calc(88);  // a call we don't care about
        calc(1,2); // LOOKING for this one
        calc(1);   // another call we don't care about

        // looking for the call with args = {1,2}
        expect(addSpy.withArgs(1,2)).to.have.been.calledOnce;
    });

    // Don't HAVE to spy on $log because ngMocks does that for us.
    it('$log is an ngMock spy that can tell us about logged messages', function() {
        // ngMock defined $log as a spy that doesn't write to console
        // assert calc logged the result
        expect($log.debug.logs.length).to.equal(1,
            'Should have called $log.debug exactly once');

        // with the expected message
        expect($log.debug.logs[0][0]).to.equal('calc(42, undefined) => 42');
    });

});
