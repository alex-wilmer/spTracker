function issueFormCtrl($rootScope, $scope, $http) {
  
  this.getUsers = function(value) {
	  return $http({
	    method: 'GET'
	  , url: _spPageContextInfo.webAbsoluteUrl
	  + "/_api/web/siteusers"
	  , headers: { "Accept": "application/json;odata=verbose" }
	  })
	  .then(function(response) {
	    var users = [];
	    angular.forEach(response.data.d.results, function(user) {
	      if (user.Title.toLowerCase().indexOf(value.toLowerCase()) > -1)
	        users.push(user);
	    });
	    return this.users = users;
	  });
	}
	
	function validate (issue) {
	  var errors = [];
    if (!issue.category)
	    errors.push({type:'Invalid Category', message:'Please select a category'});
	  else if (issue.category.type !== 'Requirement' && !issue.category.subType)
	    errors.push({type:'Invalid Subtype', message:'Please select a type'});
	  if (!issue.title)
	    errors.push({type:'Invalid Title', message:'Please enter a title'});
	  if (!issue.description)
	    errors.push({type:'Invalid Description', message:'Please enter a description'});	    
	  return errors;
	}
	
	this.issueInsert = function() {
	
	  var issue;
	  if (!(issue = this.newIssue))
	    return alert('You cannot submit a blank form.');

    var errors = validate(issue);
    if (errors.length)
      return alert(errors[0].message);   
    
    delete issue.category.subTypes;
    issue.assignedTo = {
      Id: issue.assignedTo.Id
    , Title: issue.assignedTo.Title
    }
    
	  // server
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
      var context = SP.ClientContext.get_current(); 
      var list = context.get_web().get_lists().getByTitle('Issues');
      var item = list.addItem(new SP.ListItemCreationInformation());    
      item.set_item('Category', JSON.stringify(issue.category));
      item.set_item('Title', issue.title);
			item.set_item('Description', issue.description);
			item.set_item('Priority', issue.priority);
			item.set_item('Assigned', JSON.stringify(issue.assignedTo));
      item.update();
      context.executeQueryAsync(function() {
        log('New Issue added successfully!');
        $rootScope.$emit('getIssues');
        $scope.tracker.setTemplate('issue_table.html')
      }, function(a, b){log(a+'\n'+b.get_message());});
    });   
    
	}
}

angular
  .module('spTrackerApp')
  .controller('issueFormCtrl', issueFormCtrl);
