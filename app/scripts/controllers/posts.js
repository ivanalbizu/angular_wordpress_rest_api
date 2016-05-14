(function() {
  'use strict';

  angular.module('wpapiApp')
    .controller('PostsCtrl', PostsCtrl);

    PostsCtrl.$inject = [ 'PostsServices' ];
    function PostsCtrl ( PostsServices ) {

      var vm = this;

      vm.getAll     = getAll;
      vm.deletePost = deletePost;
      vm.createPost = createPost;

      getAll();

      function getAll() {
        PostsServices.getAllData().then(function(dataResponse) {
          vm.posts = dataResponse;
        });
      }

      function deletePost(id) {
        PostsServices.deletePostData(id).then(function(dataResponse) {
          console.log(dataResponse);
          getAll();
        });
      }

      function createPost(post) {
        var data = $.param({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          status: 'publish',
        });
        PostsServices.createPostData(data).then(function(dataResponse) {
          resetFields();
          getAll();
        });
      }

      function resetFields() {
        vm.title = '';
        vm.content = '';
        vm.excerpt = '';
      }

    }
})();
