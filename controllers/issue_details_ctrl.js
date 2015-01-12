function issueDetailsCtrl ($scope) {
  this.ownsIssue = function() {
    return $scope.tracker.currentIssue.AuthorId === _spPageContextInfo.userId;
  }
}

angular
  .module('spTrackerApp')
  .controller('issueDetailsCtrl', issueDetailsCtrl);