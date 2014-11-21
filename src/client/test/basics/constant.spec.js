/* jshint -W117, -W109, -W030 */
describe('Basics - constant:', function() {
    'use strict';

    beforeEach(module('basics'));

    describe("the config2 constant", function () {

        var configConstant;
        var $log;

        // inject triggers injector creation; module definition now "baked"
        beforeEach(inject(function(config2, _$log_){
            configConstant = config2;
            $log = _$log_;
        }));

        it("is accessible", function(){
            expect(configConstant).to.exist;
        });

        it("#debugMode is true", function(){
            expect(configConstant.debugMode).to.be.true;
        });

        it("#foo is 'foo'", function(){
            expect(configConstant.foo).to.be.equal('foo');
        });
    });


    describe("the $logProvider, which is configured with config2,", function(){
        var configConstant;
        var $log;
        var $logProvider;

        beforeEach(module(
            // Could combine with module('basics') definition in outer describe
            // but only need it here in this describe

            // This module definition function has access to any previously defined provider
            // which in this case is any provider defined in ng, ngMocks, or basics
            function( _$logProvider_) {
                $logProvider = _$logProvider_;
            }
        ));

        // inject triggers injector creation; module definition now "baked"
        beforeEach(inject(function(config2, _$log_){
            configConstant = config2;
            $log = _$log_;
        }));

        it("is accessible via the module function", function(){
            expect($logProvider).to.exist;
        });

        it("is not the same as the log service", function(){
            expect($logProvider).not.to.equal($log);
        });

        it("has same debugEnabled value as config2.debugMode", function(){
            expect($logProvider.debugEnabled()).to.equal(configConstant.debugMode);
        });


        it("has a made-up 'foo' value from config2.foo", function(){
            expect($logProvider.foo).to.exist;
            expect($logProvider.foo).to.equal(configConstant.foo);
        });
    });

    // Demonstrates how difficult it is to test
    // constants and a module config phase.
    // Recommend very limited use of both.
    describe("when fake constant 'config2'", function(){

        var configConstant;
        var $logProvider;
        var $logProviderFirstFoo;

        // can't decorate a constant but you can replace it
        beforeEach(module(function($provide, config2, _$logProvider_) {

             // hold on to the $logProvider for later assertions
            $logProvider = _$logProvider_; 

            // $logProvider.foo was already set to current config2.foo
            // by the 'basics.config' call, defined in basics.src.js
            // Therefore, changing it now is too late for $logProvider
            $logProviderFirstFoo = $logProvider.foo;

            // Overwrites original constant
            // This is effective in the module run phase
            // and for services that inject config2 
            // but not for anything done during the
            // 'basics' module's config phase
            $provide.constant('config2', {
                debugMode:  config2.debugMode, // copy original value
                foo: 'bar' // HERE IS OUR CHANGE
            });

            // If we needed to change $logProvider.foo during test
            // must do it here and must assume that $logProvider
            // hasn't already committed to using the previous value.

        }));

        // inject triggers injector creation; module definition now "baked"
        beforeEach(inject(function( config2){
            configConstant = config2;
        }));

        it("config2.foo has revised value, 'bar'", function(){
            expect(configConstant.foo).to.equal('bar');
        })

        // Unfortunately, revised config2 value was added too late
        // to be used in a config phase of the 'basics' module.
        it("Too late! $logProvider has 'foo' value from ORIGINAL config2.foo", 
            function(){
                expect($logProvider.foo).to.not.equal(configConstant.foo, 
                    '!== CURRENT config2.foo');
                expect($logProvider.foo).to.equal($logProviderFirstFoo,
                    '=== ORIGINAL foo');
            });

    });
});
