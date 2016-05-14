(function() {
  'use strict';

  angular.module('wpapiApp')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$injector = [ 'LoginServices' ];
    function LoginCtrl ( LoginServices ) {

      var vm = this;

      vm.login = login;

      function login(data) {
        var serializedData = $.param({
          username: data.username,
          password: data.password
        });
        LoginServices.login(serializedData).then(function(dataResponse) {
          window.localStorage['token'] = dataResponse;
          console.log(dataResponse);
        });
      }

    }

})();
