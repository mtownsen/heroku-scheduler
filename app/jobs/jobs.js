'use strict';

angular.module('myApp.jobs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/jobs', {
    templateUrl: 'jobs/jobs.html',
    controller: 'JobsCtrl'
  });
}])

.controller('JobsCtrl', ['$scope', 'JobFactory', function($scope, JobFactory) {

	$scope.showCreateForm = false;
	JobFactory.getJobs()
	 	.success(function(data){
	 		$scope.jobs = data;
	 	});

	$scope.addJob = function(newJob) {
		$scope.showNewForm = false;
	    JobFactory.addJob(newJob);
	    $scope.jobs.push(newJob);
	};

	$scope.removeJob = function(job) {
	    var index = $scope.jobs.indexOf(job);
	    $scope.jobs.splice(index, 1); 
	    JobFactory.deleteJob(newJob);
	};

	$scope.saveJob = function(job) {
		JobFactory.updateJob(job);
	};

	$scope.showCreateForm = function() {
		$scope.showCreateForm = true;
	};

	$scope.dynos = [
	 { value: 'free', name: 'Free' },
	 { value: 'medium', name: 'Medim' },
	 { value: 'large', name: 'Large' }
    ];

    $scope.frequencys = [
	 { value: 'daily', name: 'Daily' },
	 { value: 'weekly', name: 'Weekly' },
	 { value: 'monthly', name: 'Monthly' }
    ];

}])

.factory('JobFactory', ['$http', function($http) {
	return {
		getJobs: function() {
			return $http.get('/jobs/jobs.json');
		},
		updateJob: function(job) {

		},
		addJob: function(job) {

		},
		deleteJob: function(job) {

		}
	};
}])