(function() {
  'use strict';

  angular.module('wpapiApp')
    .factory('LoginServices', LoginServices);

    LoginServices.$inject = [ '$http', 'URL_API' ];
    function LoginServices( $http, URL_API ) {

      return {
        login:  login,
      };

      function login(data) {
        window.localStorage.removeItem('token');
        return $http({
            method: 'POST',
            url: URL_API.BASE_URL + '/jwt-Auth/v1/token',
            data: data,
          })
          .then(function(result) {
              return result.data.token;
            }, function(error) {
              console.log(error);
            });
      }

    }

})();
