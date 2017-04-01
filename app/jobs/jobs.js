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

	$scope.submitForm = function(isValid) {
		if (isValid) {
			$scope.showNewForm = false;
			
			//Grab a copy of the job so we can reuse the form variable.
			var newJob = angular.copy($scope.newJob)
			var createdJob = JobFactory.addJob(newJob);
			$scope.jobs.push(createdJob);

			//Reset form to allow user to create new jobs.
			$scope.newJob.command = '';
			$scope.newJob.dyno = '';
			$scope.newJob.frequency = '';
			$scope.newJobForm.$setPristine();
   		$scope.newJobForm.$setUntouched();
		}
		else 
			alert('Whoops. We seem to be missing something.');
	};

	$scope.removeJob = function(job) {
	    var index = $scope.jobs.indexOf(job);
	    $scope.jobs.splice(index, 1); 
	    JobFactory.deleteJob(job);
	};

	$scope.saveJob = function(job) {
		JobFactory.updateJob(job);
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
			//Temp mock code to display a return from server with filled in next date.
			var jobFrequency = job.frequency.toLowerCase();
			if(jobFrequency == "daily")
			{
				var nextRunDate = new Date();
				nextRunDate.setDate(nextRunDate.getDate() + 1)
				job.next = nextRunDate;
				return job;
			}
			else if (jobFrequency == "weekly") {
				var nextRunDate = new Date();
				nextRunDate.setDate(nextRunDate.getDate() + 7)
				job.next = nextRunDate;
				return job;
			}
			else if (jobFrequency == "monthly") {
				var nextRunDate = new Date();
				nextRunDate.setDate(nextRunDate.getDate() + 30)
				job.next = nextRunDate;
				return job;
			}
		},
		deleteJob: function(job) {

		}
	};
}])