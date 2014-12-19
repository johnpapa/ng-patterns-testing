/*jshint -W079, -W101, -W109, -W117 */
/**
 * Stubs for commonly stubbed dataservice methods.
 **/
var stubs = (function() {
    return {
        getAvengers:     getAvengers,
        getAvengersCast: getAvengersCast,
        happyService:    happyService,
        sadService:      sadService
    };


    function getAvengers() {
        return stubIt('getAvengers', mockData.getAvengers());
    }

    function getAvengersCast() {
        return stubIt('getAvengersCast', mockData.getAvengersCast());
    }

    ////////////////////////////
    function stubIt(method, returnValue) {
        // stubIt is paranoid
        // it (re)injects dataservice and $q
        var result;
        inject(function(dataservice, $q) {
            result = sinon.stub(dataservice, method)
                          .returns($q.when(returnValue));
        });
        return result;
    }

    /////////////////////

    // The following mockService factories assume
    // dataservice and $q were previously injected and are global

    function happyService() {
        return specHelper.mockService(dataservice, {
            getAvengers: $q.when(mockData.getAvengers()),
            ready:       $q.when(dataservice),
            _default:    $q.when([])
        });
    }

    function sadService() {
        return specHelper.mockService(dataservice, {
            _default:  $q.reject('this method was doomed')
        });
    }

})();
