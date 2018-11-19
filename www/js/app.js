var app = angular.module('myApp', ['ngRoute']);
/*  bez przeładowywania strony używa sie ngRoute modułu.*/
app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      controller: 'mainController', 
      templateUrl: 'views/main.html' 
    })
    .when('/calibration', {
     
      templateUrl: 'views/calibration.html' 
    }) 
    .otherwise({ 
      redirectTo: '/' 
    }); 
});