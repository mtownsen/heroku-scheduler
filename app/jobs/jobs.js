'use strict';

var module = angular.module('myApp.jobs', ['ngRoute'])

module.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/jobs', {
    templateUrl: 'jobs/jobs.html',
    controller: 'JobsCtrl'
  });
}]);