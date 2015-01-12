function spTrackerCtrl () {

  // Hardcoded types
  this.categories = [
	  {
	    type: 'Bug'
	  , subTypes: ['New', 'Regression']
	  }
	, {
	    type: 'Change'
	  , subTypes: ['Request', 'Approved', 'Denied']
	  }
	, {
	    type: 'Requirement'
	  }
	];
	
  this.priorities = ['Low', 'Medium', 'High'];
  
  // Initial Template
  var templatePath = "http://halton.qa/sp-tracker/app/templates/"
  this.template = templatePath + "issue_table.html";
  
  this.setTemplate = function(templateUrl) {
    this.template = templatePath + templateUrl;
  };
  
}

angular
  .module('spTrackerApp')
  .controller('spTrackerCtrl', spTrackerCtrl);
 