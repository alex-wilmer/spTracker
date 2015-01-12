function issueTableCtrl ($rootScope, $scope, $http) {
  var getIssues = function() {
	  $http({
	    method: 'GET'
	  , url: _spPageContextInfo.webAbsoluteUrl
	  + "/_api/web/lists/getByTitle('Issues')/items"
	  , headers: { "Accept": "application/json;odata=verbose" }
	  })
	  .success(function(data) {
	    var issues = data.d.results;
	    if (issues.length)
	    	angular.forEach(issues, function(issue) {
	    	  issue.Assigned = JSON.parse(issue.Assigned);
	    	  issue.Category = JSON.parse(issue.Category);
	    	  issue.Modified = new Date(issue.Modified);
	    	});
	    $scope.issueTable.issues = issues;
	  });
	}
	
	getIssues();
  
  $rootScope.$on('getIssues', function() {
    getIssues();
  });
}

angular
  .module('spTrackerApp')
  .controller('issueTableCtrl', issueTableCtrl);