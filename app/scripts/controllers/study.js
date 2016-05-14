(function() {
  'use strict';

  angular.module('wpapiApp')
    .controller('StudyCtrl', StudyCtrl)
    .controller('ModalStudyCtrl', ModalStudyCtrl);


    ModalStudyCtrl.$inject = [ '$routeParams', '$modalInstance', 'StudyServices', '$route' ];
    function ModalStudyCtrl ( $routeParams, $modalInstance, StudyServices, $route ) {

      var vmm = this;
      var id = $routeParams.id;
      vmm.messageText = 'Editando Estudio';

      vmm.cancel = cancel;
      vmm.getStudy = getStudy;
      vmm.editStudy = editStudy;

      vmm.getStudy(id);

      function cancel() {
        console.log('Se cancela guardar usando modal');
        $modalInstance.dismiss();
      }

      function getStudy(id) {
        StudyServices.getStudyData(id).then(function(dataResponse) {
          vmm.study = dataResponse;
        });
      }

      function editStudy(study, id) {
        console.log(study.year.toString());
        var data = $.param({
          title: study.title.rendered,
          year: study.year.toString() || '',
          school: study.school.toString() || '',
          content: study.content.rendered || 'Lorem',
          slug: encodeURIComponent(study.title.rendered.replace(/\s+/g, '-').toLowerCase()),
        });
        console.log(data);
        StudyServices.editStudyData(data, id).then(function(dataResponse) {
          console.log("Se guarda en el modal ", dataResponse);
          $modalInstance.close($route.reload());
        });
      }

    }


    StudyCtrl.$inject = [ '$routeParams', 'StudyServices', '$modal' ];
    function StudyCtrl ( $routeParams, StudyServices, $modal ) {

      var vm = this;
      var id = $routeParams.id;

      vm.getStudy              = getStudy;
      vm.openModal             = openModal;

      vm.getStudy(id);

      function getStudy(id) {
        StudyServices.getStudyData(id).then(function(dataResponse) {
          vm.study = dataResponse;
        });
      }

      function openModal() {
        console.log('Se abre modal');
        var modalInstance = $modal.open({
          controller: 'ModalStudyCtrl as vmm',
          templateUrl: 'modal-study.html'
        });
      }

    }

})();
