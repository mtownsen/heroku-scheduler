module.controller('JobsCtrl', ['$scope', '$location', '$anchorScroll', 'JobFactory', function($scope, $location, $anchorScroll, JobFactory) {

	$scope.showCreateForm = false;

	JobFactory.getJobs()
	 	.success(function(data){
	 		$scope.jobs = data;
 	});

	$scope.$watch('showNewForm', function() {
		if($scope.showNewForm)
		{
			//Wait for dom to render
			setTimeout(function(){
				//scroll down to bring the new job form onto the screen
				$location.hash('newJobForm');
				$anchorScroll();    
			}, 100);	
		}
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

}]);