/* jshint -W117, -W109, -W030 */
describe('Basics - value:', function() {
    'use strict';

    var config;

    beforeEach(module('basics'));

    describe('when NOT decorated', function() {

        // inject the original config
        beforeEach(inject(function(_config_) { 
            config = _config_; 
        }));

        it('config.apiBaseUri has expected original value', function() {
            expect(config.apiBaseUri).to.equal('/api/marvel/');
        });
    });



    // Re-define the ENTIRE 'config' component
    // by re-registering with a completely new value
    describe("when completely replaced:", function() {

        var config;

        // A new apiBaseUri to reach a different server, our test server
        var mockApiBaseUri = '/api/replaced/location';
        var mockAppTitle   = 'Mock Avengers';

        // revise the module cookbook
        beforeEach(module(function($provide) {

            $provide.value('config', {
                apiBaseUri: mockApiBaseUri,
                appTitle: mockAppTitle
            });

        }));

        // inject the revised 'config'
        beforeEach(inject(function(_config_) { 
            config = _config_; 
        }));

        it('config.apiBaseUri has mocked value', function() {
            expect(config.apiBaseUri).to.equal(mockApiBaseUri);
        });

        it('config.appTitle has mocked value', function() {
            expect(config.appTitle).to.equal(mockAppTitle);
        });
    });


    // Re-define a PART of the 'config' component by decoration
    describe("when decorated", function() {

        // A new apiBaseUri to reach a different server, our test server
        var mockApiBaseUri = '/api/decorated/location';

        // revise the module cookbook
        beforeEach(module(function($provide) {

            // $delegate is the original 'config' value.
            $provide.decorator('config', function($delegate) {

                // WARNING: HIGH RISK OF CROSS TEST POLLUTION
                //          WHEN DECORATING A "VALUE" COMPONENT
                //
                // Beware when changing the ORIGINAL value
                // That's OK in production because it's the only use.
                // But if you change the original value while testing
                // later tests get your DECORATED version!!!
                //
                // This is ONLY A PROBLEM WITH VALUES
                // Not an issue with other ng component types
                // See "service-decorated.spec".
                //
                // Here we first redefine $delegate as a COPY of itself.
                // See how things go wrong if you comment this out!
                $delegate = angular.extend({}, $delegate);

                // change only this one property
                $delegate.apiBaseUri = mockApiBaseUri;
                return $delegate;
            });

        }));

        // inject the decorated 'config'
        beforeEach(inject(function(_config_) { 
            config = _config_; 
        }));

        it('config.apiBaseUri has mocked value', function() {
            expect(config.apiBaseUri).to.equal(mockApiBaseUri);
        });      
    });



    // no cross-test pollution
    // unless you mistakenly changed the original 'config' when decorating
    describe('when original is revisited', function() {

        beforeEach(inject(function(_config_) { 
            config = _config_; 
        }));

        it('config.apiBaseUri has expected original value', function() {
            expect(config.apiBaseUri).to.equal('/api/marvel/', 
                'failure indicates cross-test pollution');
        });
    });

});
