angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

   $routeProvider

       // home page
       .when('/', {
           templateUrl: 'views/home.html',
           controller: 'MainController'
       })

       // nerds page that will use the NerdController
       .when('/mystuff', {
           templateUrl: 'views/mystuff.html',
           controller: 'MyController'
       })

       .when('/trades', {
           templateUrl: 'views/trades.html',
           controller: 'TradesController'
       });


   $locationProvider.html5Mode(true);

}]);
