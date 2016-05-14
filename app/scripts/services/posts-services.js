(function() {
  'use strict';

  angular.module('wpapiApp')
    .factory('PostsServices', PostsServices)
    .factory('PostServices', PostServices);

    PostsServices.$inject = ['$http', '$rootScope', 'URL_API'];
    function PostsServices($http, $rootScope, URL_API) {

      return {
        getAllData: getAllData,
        deletePostData: deletePostData,
        createPostData: createPostData
      };

      function getAllData() {
        return $http({
          method : "GET",
          url : URL_API.BASE_URL + '/wp/v2/posts',
        }).then(function(response) {
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      function deletePostData(id) {
        return $http({
          method : "DELETE",
          url : URL_API.BASE_URL + '/wp/v2/posts/' + id,
        }).then(function(response) {
          console.log("Se ha eliminado: ", response.data);
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      function createPostData(data) {
        return $http({
          method : "POST",
          url : URL_API.BASE_URL + '/wp/v2/posts',
          data: data,
        }).then(function(response) {
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

    }

    PostServices.$inject = ['$http', '$rootScope', 'URL_API'];
    function PostServices($http, $rootScope, URL_API) {

      return {
        getPostData:  getPostData,
        editPostData: editPostData,
        getPostRevissionsData: getPostRevissionsData,
        deletePostRevissionsData: deletePostRevissionsData
      };

      function getPostData(id) {
        return $http({
          method : "GET",
          url : URL_API.BASE_URL + '/wp/v2/posts/' + id,
        }).then(function(response) {
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      function editPostData(data, id) {
        return $http({
          method : "POST",
          url : URL_API.BASE_URL + '/wp/v2/posts/' + id,
          data: data,
        }).then(function(response) {
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      function getPostRevissionsData(id) {
        return $http({
          method : "GET",
          url : URL_API.BASE_URL + '/wp/v2/posts/' + id + '/revisions',
        }).then(function(response) {
          //console.log(response.data);
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      function deletePostRevissionsData(id) {
        return $http({
          method : "DELETE",
          url : URL_API.BASE_URL + '/wp/v2/posts/1/revisions/' + id,
        }).then(function(response) {
          console.log("Se ha eliminado: ", response.data);
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

    }

})();
