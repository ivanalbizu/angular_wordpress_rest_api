(function() {
  'use strict';

  angular.module('wpapiApp')
    .controller('StudiesCtrl', StudiesCtrl);

    StudiesCtrl.$inject = [ 'StudiesServices' ];
    function StudiesCtrl ( StudiesServices ) {

      var vm = this;

      vm.getAll     = getAll;
      vm.deleteStudy = deleteStudy;
      vm.createStudy = createStudy;

      getAll();

      function getAll() {
        StudiesServices.getAllData().then(function(dataResponse) {
          vm.studies = dataResponse;
          vm.enable = true;
        });
      }

      function deleteStudy(id) {
        vm.enable = false;
        StudiesServices.deleteStudyData(id).then(function(dataResponse) {
          console.log(dataResponse);
          getAll();
        });
      }

      function createStudy(study) {
        vm.enable = false;
        var data = $.param({
          title: study.title || 'Sin titulo',
          year: study.year || '', //ACF
          school: study.school || '', //ACF
          content: study.content || 'Lorem',
          status: 'publish',
        });
        StudiesServices.createStudyData(data).then(function(dataResponse) {
          resetFields();
          getAll();
          vm.enable = true;
        });
      }

      function resetFields() {
        vm.title = '';
        vm.year = ''; //ACF
        vm.school = ''; //ACF
        vm.content = '';
      }

    }
})();
