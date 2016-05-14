(function() {
  'use strict';

  angular.module('wpapiApp')
    .factory('UserServices', UserServices);

    UserServices.$inject = [ '$http', '$rootScope', 'URL_API' ];
    function UserServices( $http, $rootScope, URL_API ) {

      function getCurrentUserData() {
        var user_id = getUserId().user.id;
        return $http({
          method: 'GET',
          // Se concatena a la URL '?context=edit'
          // para poder tener acceso a más campos
          url: URL_API.BASE_URL + '/wp/v2/users/' + user_id +'?context=edit',
        }).then(function(response) {
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      function getUserId() {
        try{
          var token = localStorage['token'];
          if (token === '') return;

          var base64Url = token.split('.')[1];
          var base64 = base64Url.replace('-', '+').replace('_', '/');

          console.log(JSON.parse(window.atob(base64)).data);

          return JSON.parse(window.atob(base64)).data;
        } catch(err) {
          //$location.path('/');
        }
      }

      function editUserData(data, id) {
        return $http({
          method : "POST",
          // Se concatena a la URL '?context=edit'
          // para poder editar algunos campos
          url : URL_API.BASE_URL + '/wp/v2/users/' + id +'?context=edit',
          data: data,
        }).then(function(response) {
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      return {
        getCurrentUserData:  getCurrentUserData,
        editUserData: editUserData,
      };

    }

})();
