'use strict';

angular.module('myApp.jobs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/jobs', {
    templateUrl: 'jobs/jobs.html',
    controller: 'JobsCtrl'
  });
}])

.controller('JobsCtrl', ['$scope', 'JobFactory', function($scope, JobFactory) {

	JobFactory.getJobs()
	 	.success(function(data){
	 		$scope.jobs = data;
	 	});

	$scope.addJob = function() {
		JobFactory.addJob($scope.newJob)
		 	.success(function(data) {

	 		});
	};

}])

.factory('JobFactory', ['$http', function($http) {
	return {
		getJobs: function() {
			return $http.get('/jobs/jobs.json');
		},
		addJob: function(job) {

		},
		deleteJob: function(job) {

		}
	};
}])