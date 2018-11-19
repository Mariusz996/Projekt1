app.factory('mainService', ['$http', function($http) {
  return $http.get('https://raw.githubusercontent.com/Justyna00/Projekt/master/sample-data.json');
}]);
 