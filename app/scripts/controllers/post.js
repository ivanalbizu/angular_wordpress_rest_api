(function() {
  'use strict';

  angular.module('wpapiApp')
    .controller('PostCtrl', PostCtrl)
    .controller('ModalPostCtrl', ModalPostCtrl);


    ModalPostCtrl.$inject = [ '$routeParams', '$modalInstance', 'PostServices', '$route' ];
    function ModalPostCtrl ( $routeParams, $modalInstance, PostServices, $route ) {

      var vmm = this;
      var id = $routeParams.id;
      vmm.messageText = 'Editando Post';

      vmm.cancel = cancel;
      vmm.getPost = getPost;
      vmm.editPost = editPost;

      vmm.getPost(id);

      function cancel() {
        console.log('Se cancela guardar usando modal');
        $modalInstance.dismiss();
      }

      function getPost(id) {
        PostServices.getPostData(id).then(function(dataResponse) {
          vmm.post = dataResponse;
        });
      }

      function editPost(post, id) {
        var data = $.param({
          title: post.title.rendered,
          content: post.content.rendered,
          excerpt: post.excerpt.rendered,
          slug: encodeURIComponent(post.title.rendered.replace(/\s+/g, '-').toLowerCase()),
        });
        PostServices.editPostData(data, id).then(function(dataResponse) {
          console.log("Se guarda en el modal");
          $modalInstance.close($route.reload());
        });
      }

    }


    PostCtrl.$inject = [ '$routeParams', 'PostServices', '$modal' ];
    function PostCtrl ( $routeParams, PostServices, $modal ) {

      var vm = this;
      var id = $routeParams.id;

      vm.getPost              = getPost;
      vm.getPostRevissions    = getPostRevissions;
      vm.deletePostRevissions = deletePostRevissions;
      vm.openModal            = openModal;

      vm.getPost(id);
      vm.getPostRevissions(id);

      function getPost(id) {
        PostServices.getPostData(id).then(function(dataResponse) {
          vm.post = dataResponse;
        });
      }

      function getPostRevissions(id) {
        PostServices.getPostRevissionsData(id).then(function(dataResponse) {
          vm.posts = dataResponse;
        });
      }

      function deletePostRevissions(id_revission_delete) {
        PostServices.deletePostRevissionsData(id_revission_delete).then(function(dataResponse) {
          vm.getPostRevissions(id);
        });
      }

      function openModal() {
        console.log('Se abre modal');
        var modalInstance = $modal.open({
          controller: 'ModalPostCtrl as vmm',
          templateUrl: 'modal-post.html'
        });
      }

    }

})();
