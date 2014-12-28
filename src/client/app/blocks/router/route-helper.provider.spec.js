/* jshint -W117, -W030 */
describe('blocks.router routehelper', function () {

    var routehelperConfig, testRoute;

    beforeEach(function () {
        module('blocks.router',
          bard.fakeToastr,
          configureRoutehelper);

        bard.inject('$rootScope', '$route', 'routehelper');

        testRoute = getTestRoute();
    });

    it('has no routes before configuration', function() {
        expect($route.routes).to.be.empty;
    });

    it('`configureRoutes` loads a route', function() {
        routehelper.configureRoutes([testRoute]);

        expect($route.routes[testRoute.url])
            .to.have.property('title', testRoute.config.title, 'route');
    });

    it('a loaded route has a resolve with a `ready`', function() {
        routehelper.configureRoutes([testRoute]);

        expect($route.routes[testRoute.url])
            .to.have.deep.property('resolve.ready');
    });

    it('has the \'otherwise\' route after 1st `configureRoutes`', function() {
        routehelper.configureRoutes([testRoute]);

        expect($route.routes[null])
            .to.have.property('redirectTo');
    });

    it('`configureRoutes` can add multiple routes', function() {
        var routes = [testRoute, getTestRoute(2), getTestRoute(3)];
        routehelper.configureRoutes(routes);

        routes.forEach(function(r) {
            expect($route.routes[r.url]).to.not.be.empty;
        });
    });

    it('`configureRoutes` adds routes each time called', function() {
        var routes1 = [testRoute, getTestRoute(2), getTestRoute(3)];
        var routes2 = [getTestRoute(4), getTestRoute(5)];

        routehelper.configureRoutes(routes1);
        routehelper.configureRoutes(routes2);

        var routes = routes1.concat(routes2);

        routes.forEach(function(r) {
            expect($route.routes[r.url]).to.not.be.empty;
        });
    });

    it('`$route.routes` preserves the order of routes added', function() {
        // in fact, it alphabetizes them
        // apparently route order must not matter in route resolution

        // these routes are added in non-alpha order
        var routeIds = [1, 3, 2, 42, 4];
        routes = routeIds.map(function(id) {return getTestRoute(id);});

        routehelper.configureRoutes(routes);

        var highestIndex = -1;
        var actualRoutes = $route.routes;
        angular.forEach(actualRoutes, function(route, key) {
            if (key === 'null') { return; } // ignore 'otherwise' route
            var m = key.match(/\d+/);
            if (m === null) {
                expect('route=' + key + ' lacks an id').to.be.false;
            }
            var ix = routeIds.indexOf(+m[0]);
            expect(ix).to.be.at.least(highestIndex, key);
            highestIndex = ix;
        });
    });

    it('`getRoutes` returns just the routes with titles', function() {
        var routes = [testRoute, getTestRoute(2), getTestRoute(3)];
        routehelper.configureRoutes(routes);

        var routeKeys = Object.keys($route.routes);
        var titleRoutes = routehelper.getRoutes();

        expect(routeKeys)
            .to.have.length.above(titleRoutes.length, '$routes count');
        expect(titleRoutes)
            .to.have.length(routes.length, 'title routes');
    });

    it('later route, w/ duplicate url, wins', function() {

        routehelper.configureRoutes([testRoute]);
        testRoute.config.title = 'duplicate';
        routehelper.configureRoutes([testRoute]);

        expect($route.routes[testRoute.url])
            .to.have.property('title', 'duplicate', 'route');
    });

  ////// helpers /////

    function configureRoutehelper ($routeProvider, routehelperConfigProvider) {
        // An app module would configure the routehelper
        // in this manner during its config phase
        var config = routehelperConfigProvider.config;
        config.$routeProvider = $routeProvider;
        config.docTitle = 'NG-Testing: ';
        var resolveAlways = {
            ready: function($q) {
                return $q.when('test resolve is always ready');
            }
        };
        config.resolveAlways = resolveAlways;

        // Make it available during tests
        routehelperConfig = config;
    }

    function getTestRoute(index) {
        var test = 'test' + (index || '');
        return {
            url: '/' + test,
            config: {
                templateUrl: test + '.html',
                controller: test + 'Controller',
                controllerAs: 'vm',
                title: test,
                settings: {
                    nav: index ? index + 1 : 1,
                    content: '<i class="fa fa-lock"></i> ' + test
                }
          }
        };
    }
});
