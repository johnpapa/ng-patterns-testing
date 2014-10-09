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

        it("#debugMode is true ", function(){
            expect(configConstant.debugMode).to.be.true;
        });
    });



    describe("the $logProvider", function(){
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
    });

});
