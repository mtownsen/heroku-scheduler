module.factory('JobFactory', ['$http', function($http) {
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