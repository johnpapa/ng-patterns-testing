/* jshint -W117, -W030, -W109 */
/* jscs: disable */
/* Using chai BDD (expect) assertions:
   http://chaijs.com/api/bdd/ */

describe('basics:', function () {
    it('true should be true', function () {
        expect(true).to.be.true;
    });



    describe('truthiness', function () {         
        it('true is truthy', function () {
            expect(true).to.be.ok;
        });
        it('1 is truthy', function () {
            expect(1).to.be.ok;
        });
        it('"false" is truthy', function () {
            expect('false').to.be.ok;
        });
        it('0 is falsey', function () {
            expect(0).to.be.not.ok;
        });
    });


    describe('array', function () {
        var array;
        beforeEach(function () {
            array = [1,2,3];
        });

        it('push should add item to the end', function () {
            array.push(5);
            expect(array).to.have.length(4);
            expect(array[3]).to.equal(5);
        });

        it('pop should remove the last one', function () {
            var popped = array.pop();
            expect(popped).to.equal(3);
            expect(array).to.have.length(2);
        });
    });



    // SUT: System Under Test
    function setSeed(seed) {

        if (seed === 0) {
            // throw new Error('some other error');
            throw new Error('0 is a bad seed');
        }
        return seed;
    }

    describe('going to seed', function () {
        it('should be ok with 3', function () {
            expect(setSeed(3)).to.be.ok;
        });

        it('should throw with 0', function () {
            expect(function () {
                setSeed(0);
            }).to.throw(/bad seed/);
        });
    });
});
