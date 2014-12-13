/* jshint -W117, -W109, -W030 */
describe('Basics - tweaking the service:', function() {
    'use strict';

    var math;

    beforeEach(module('basics'));

    describe('when untouched', function() {
        beforeEach(inject(function(mathService) { 
            math = mathService; 
        }));

        it('add(2) => 2', function() {
            expect(math.add(2)).to.equal(2);
        });

        it('multiply(2, 2) => 4', function() {
            expect(math.multiply(2, 2)).to.equal(4);
        });
    });


    // Re-define the ENTIRE 'mathService' component
    // by re-registering with a completely new implementation
    describe("when completely replaced:", function() {

        // revise the module cookbook
        beforeEach(module(function($provide) {

            $provide.service('mathService', ReplacementMathService);

            function ReplacementMathService() {
                // add two values, even if they are strings
                // but THIS time default 'b' to 1 instead of 0
                /* jshint -W040, -W007*/
                this.add = function(a, b) { return +(a || 0) + +(b || 1); };
                /* jshint +W040, +W007 */
                // the answer is always 42;
                this.multiply = function() { return 42; };

            }

        }));

        beforeEach(inject(function(mathService) { 
            math = mathService; 
        }));

        it('add(2) => 3 (changed by replacement)', function() {
            expect(math.add(2)).to.equal(3);
        });

        it('multiply(2, 2) => 42 (changed by replacement)', function() {
            expect(math.multiply(2, 2)).to.equal(42);
        });
    });

    describe('when decorated', function() {
        // revise the module cookbook
        beforeEach(module(function($provide) {

            // $delegate is an INSTANCE of the original 'mathService'.
            $provide.decorator('mathService', function($delegate) {

                // Leave multiply alone
                // Change the 'add' method
                var originalAdd = $delegate.add;

                $delegate.add = function(a, b) {
                    b = (b === undefined) ? 1 : b;
                    return originalAdd(a, b);
                };

                return $delegate;
            });

        }));

        beforeEach(inject(function(mathService) { 
            math = mathService; 
        }));

        it('add(2) => 3 (changed by decoration)', function() {
            expect(math.add(2)).to.equal(3);
        });

        it('multiply(2, 2) => 4 (unchanged by decoration)', function() {
            expect(math.multiply(2, 2)).to.equal(4);
        });
    }); 

    // Demonstrates there is no cross test pollution
    describe('when original is revisited', function() {
        beforeEach(inject(function(mathService) { 
            math = mathService; 
        }));

        it('add(2) => 2', function() {
            expect(math.add(2)).to.equal(2);
        });

        it('multiply(2, 2) => 4', function() {
            expect(math.multiply(2, 2)).to.equal(4);
        });
    });   

});
