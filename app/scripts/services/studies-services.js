(function() {
  'use strict';

  angular.module('wpapiApp')
    .factory('StudiesServices', StudiesServices)
    .factory('StudyServices', StudyServices);

    StudiesServices.$inject = ['$http', '$rootScope', 'URL_API'];
    function StudiesServices($http, $rootScope, URL_API) {

      return {
        getAllData: getAllData,
        deleteStudyData: deleteStudyData,
        createStudyData: createStudyData
      };

      function getAllData() {
        return $http({
          method : "GET",
          url : URL_API.BASE_URL + '/wp/v2/formacion',
        }).then(function(response) {
          console.log(response);
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      function deleteStudyData(id) {
        return $http({
          method : "DELETE",
          url : URL_API.BASE_URL + '/wp/v2/formacion/' + id,
        }).then(function(response) {
          console.log("Se ha eliminado: ", response.data);
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      function createStudyData(data) {
        return $http({
          method : "POST",
          url : URL_API.BASE_URL + '/wp/v2/formacion',
          data: data,
        }).then(function(response) {
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

    }


    StudyServices.$inject = ['$http', '$rootScope', 'URL_API'];
    function StudyServices($http, $rootScope, URL_API) {

      return {
        getStudyData:  getStudyData,
        editStudyData: editStudyData
      };

      function getStudyData(id) {
        return $http({
          method : "GET",
          url : URL_API.BASE_URL + '/wp/v2/formacion/' + id,
        }).then(function(response) {
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

      function editStudyData(data, id) {
        return $http({
          method : "POST",
          url : URL_API.BASE_URL + '/wp/v2/formacion/' + id,
          data: data,
        }).then(function(response) {
          console.log(response);
          return response.data;
        }, function(error) {
          console.log(error);
        });
      }

    }

})();
