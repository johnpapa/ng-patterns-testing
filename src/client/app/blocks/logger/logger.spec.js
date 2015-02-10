/* jshint -W117, -W030 */
describe('blocks / logger', function() {
    describe('(if allow real toastr)', function() {

        beforeEach(module('blocks.logger'));

        // This is the behavior we want to AVOID in our unit tests
        it('it writes to the DOM (when test is enabled)', function() {

            /* jshint -W027 */
            return; // remove this return during demo

            inject(function(logger) {
                // watch what happens in a browser test runner
                logger.error('Test Error');
                logger.success('Test Success');
                logger.warning('Test Warning');
            });
            /* jshint +W027 */
        });
    });

    describe('(stub toastr)', function() {

        var msg;
        var testErr = 'a test error';
        var _toastr;

        beforeEach(module('blocks.logger'));

        beforeEach(function() {
            inject(function(toastr) {
                // monkey-patch the real toastr with
                // a homebrew stub
                var stub = function(m) { msg = m; };

                toastr.error   = stub;
                toastr.info    = stub;
                toastr.success = stub;
                toastr.warning = stub;

                _toastr = toastr;
            });
        });

        // we infer it called toastr.error if msg is set
        it('infer calls `toastr.error` when log an error message', function() {
            inject(function(logger) {
                logger.error(testErr);

                expect(msg).to.equal(testErr);
            });
        });

        // we're sure it called toaster.error when we attach a sinon spy
        it('calls toastr.error when log an error message', function() {
            inject(function(logger) {

                var spy = sinon.spy(toastr, 'error');

                logger.error(testErr);

                expect(_toastr.error).to.be.calledOnce;
                expect(_toastr.error).to.be.calledWith(testErr);
            });
        });

        // $log is already a stub/spy thanks to ngMocks
        it('calls `$log.error` when log an error message', function() {
            inject(function($log, logger) {
                logger.error(testErr);

                // $log is mocked by ngMocks
                // Instead of writing to console it captures each call
                // in its own `logs` array
                var errLogs = $log.error.logs;
                expect(errLogs).to.have.length(1, '$log.error.logs');
                // logger calls $log error once with two args;
                // the error msg is arg[0]
                expect(errLogs[0][0]).to.contain(testErr);
            });
        });
    });

    describe('(replace with test dummy)', function() {
        var $log;
        var toastr;
        var logger;
        var testLogMsg = 'a test log message';

        // starting with the 'blocks.logger' module ...
        beforeEach(module('blocks.logger',

            // ... replace the 'toastr' recipe with empty dummy
            // that will throw exception if used
            function($provide) {
                $provide.constant('toastr', {});
            }
        ));

        beforeEach(inject(function(_$log_, _logger_, _toastr_) {
            $log   = _$log_;
            logger = _logger_;
            toastr = _toastr_;

            // Invoke before each test
            // Is this too DRY?
            logger.log(testLogMsg);

        }));

        it('`logger.log` does not call toastr', function() {
            // would have thrown if it called toastr
        });

        it('`logger.log` does call `$log.log`', function() {
            var logLogs = $log.log.logs;
            expect(logLogs).to.have.length(1, '$log.log.logs');
            expect(logLogs[0][0]).to.contain(testLogMsg);
        });

        // test that our assumption about the dummy toastr is true
        it('dummy toastr would throw if called', function() {
            expect(function() {
                toastr.info(testLogMsg);
            }).to.throw(TypeError);
        });
    });

    describe('(stub toastr with sinon)', function() {
        var _toastr;
        var testInfo = 'a test info message';

        // starting with the 'blocks.logger' module ...
        beforeEach(module('blocks.logger',

            // ... revise the 'toastr' recipe with stubs
            function(toastr) {
                // blindly stub every method of toastr
                sinon.stub(toastr);
                _toastr = toastr;
            }
        ));

        it('calls `toastr.info` when log an info message', function() {
            inject(function(logger) {
                logger.info(testInfo);

                expect(_toastr.info).to.be.calledOnce;
                expect(_toastr.info).to.be.calledWith(testInfo);
                expect(_toastr.info.getCall(0).args).to.have.length(2,
                    'info should be called w/ two args');
            });
        });
    });

    describe('(stub toastr routinely with $provide)', function() {
        var toastr;
        var testSuccess = 'a test success message';

        // Because we need to fake toastr all over the place
        // and do so in apps that might not even use toastr
        // we create a service "constant" for this purpose.
        //
        // See this very same method in bard.js
        function fakeToastr($provide) {

            toastr = sinon.stub({
                info: function() {},
                error: function() {},
                warning: function() {},
                success: function() {}
            });

            $provide.constant('toastr', toastr);
        }

        // then simply include it among the test module recipes
        // as needed ... as we do here
        beforeEach(module('blocks.logger', fakeToastr));

        it('calls `toastr.success` when log a success message', function() {
            inject(function(logger) {
                logger.success(testSuccess);

                expect(toastr.success).to.be.calledOnce;
                expect(toastr.success).to.be.calledWith(testSuccess);
                expect(toastr.success.getCall(0).args).to.have.length(2,
                    'success should be called w/ two args');
            });
        });
    });
});
