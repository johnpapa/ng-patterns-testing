/*jshint -W079, -W101, -W109 */
var stubs = (function() {
    return {
        getAvengers: getAvengers,
        getAvengersCast: getAvengersCast
    };

    function getAvengersCast() {
        var result;
        inject(function(dataservice, $q) {
            result = sinon.stub(dataservice, 'getAvengersCast').
                returns($q.when(mockData.getAvengersCast()));
        });
        return result;
    }
    function getAvengers() {
        var result;
        inject(function(dataservice, $q) {
            result = sinon.stub(dataservice, 'getAvengers').
                returns($q.when(mockData.getAvengers()));
        });
        return result;
    }
})();
