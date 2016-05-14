(function() {
  'use strict';

  angular.module('wpapiApp')
    .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = [ 'UserServices', '$location' ];
    function UserCtrl ( UserServices , $location ) {

      var vm = this;
      vm.login = '1';
      vm.enable = false;

      vm.getCurrentUser = getCurrentUser;
      vm.editUser = editUser;
      vm.cancelEditUser = cancelEditUser;

      vm.getCurrentUser();

      function getCurrentUser() {
        if (typeof window.localStorage !== 'undefined') {
          try {
            if (window.localStorage.getItem('token') == null) {
              vm.login = '2';
              $location.path('/login');
            } else {
              vm.login = '3';
              UserServices.getCurrentUserData().then(function(dataResponse) {
                vm.user = dataResponse;
              });
            }
          } catch(e) {
            vm.login = '4';
            $location.path('/login');
          }
        } else {
          vm.login = '5';
          $location.path('/login');
        }
      }

      function editUser(user, id) {
        var data = $.param({
          name: user.name,
          // Dos campos nuevos
          // No editables sin añadir el 'context'
          first_name: user.first_name,
          last_name: user.last_name,
          description: user.description,
          url: user.url
        });
        UserServices.editUserData(data, id).then(function(dataResponse) {
          vm.enable = false;
          getCurrentUser();
          console.log(dataResponse);
        });
      }

      function cancelEditUser() {
        vm.enable = false;
        getCurrentUser();
      }

    }

})();
