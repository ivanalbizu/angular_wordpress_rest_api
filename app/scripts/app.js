(function() {
  'use strict';

  function config($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl',
        controllerAs: 'vm'
      })
      .when('/post/:id', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl',
        controllerAs: 'vm'
      })
      .when('/studies', {
        templateUrl: 'views/studies.html',
        controller: 'StudiesCtrl',
        controllerAs: 'vm'
      })
      .when('/study/:id', {
        templateUrl: 'views/study.html',
        controller: 'StudyCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';

      $httpProvider.interceptors.push(['$q', '$location', function( $q, $location ) {
        return {
          'request': function (config) {
            config.headers = config.headers || {};
            if (window.localStorage.token) {
              config.headers.Authorization = 'Bearer ' + window.localStorage.token;
            }
            return config;
          },
          'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
              $location.path('/login');
            }
            return $q.reject(response);
          }
        };
      }]);

  }

  angular
    .module('wpapiApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap'
    ])
    .config(config)
    .constant('URL_API', {
      BASE_URL:  'http://localhost/wpapi/wp-json'
    });


})();
