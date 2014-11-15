/* jshint -W117, -W030 */
describe('Basics - service:', function() {
    'use strict';

    var add, mult;

    beforeEach(module('basics'));

    // Get the service
    // This first `angular.mock.inject` closes module registration and modification
    beforeEach(
        inject(function(mathService) {
            add = mathService.add; // capture `add` fn in a convenience var
            mult = mathService.multiply;
        })
    );

    /*** Multiple test paths ***/

    describe('(happy path test)', function() {

        it('add(1, 1) => 2', function() {
            expect(add(1, 1)).to.equal(2);
        });

        it('multi(2, 2) => 4', function() {
            expect(mult(2, 2)).to.equal(4);
        });
    });

    describe('(more happy path tests)', function() {
        
        it('add() => 0 ', function() {
            expect(add()).to.equal(0);
        });

        it('add(1) => 1 ', function() {
            expect(add(1)).to.equal(1);
        });

        it('add(1,1) => 2', function() {
            expect(add(1, 1)).to.equal(2);
        });

        it('add(-1) => -1', function() {
            expect(add(-1)).to.equal(-1);
        });

        it('add(\'0\') => 0', function() {
            expect(add('0')).to.equal(0);
        });

        it('add(\'1\') => 1', function() {
            expect(add('1')).to.equal(1);
        });

        it('add(\'-1\') => -1', function() {
            expect(add('-1')).to.equal(-1);
        });

        it('add(\'\') => 0', function() {
            expect(add('')).to.equal(0);
        });

        it('add(null) => 0', function() {
            expect(add()).to.equal(0);
        });

        it('add(undefined) => 0', function() {
            expect(add(undefined)).to.equal(0);
        });
    });

    describe('(sad paths)', function() {

        it('add(\'not a number\') => NaN ', function() {
            expect(isNaN(add('not a number'))).to.be.true;
        });

        it('add(1, \'not a number\') => NaN ', function() {
            expect(isNaN(add(1, 'not a number'))).to.be.true;
        });
    });

});
