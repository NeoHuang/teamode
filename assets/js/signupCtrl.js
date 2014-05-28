var teamodeApp = angular.module("teamodeApp",[]);
var postJsonHeader = {'Content-Type': 'application/json', 'ACCEPT': 'application/json'};
teamodeApp.factory("signupService", ["$http", function($http){
	return {
		post: function(postData){
			$http({
				method: 'POST',
				url: "/signup",
				data: postData,
				headers: postJsonHeader 
			}).success(function(data){

			})
		}
	}
}]);
SignupCtrl = function($scope, $http, signupService){
	$scope.user = {};
	$scope.register = function(){
		if ($scope.user.username &&
			$scope.user.email &&
			$scope.user.password){
			signupService.post(angular.toJson($scope.user));
	}
}
}
SignupCtrl['$inject'] = ["$scope", "$http", "signupService"];