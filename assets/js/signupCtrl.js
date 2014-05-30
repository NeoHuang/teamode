var teamodeApp = angular.module("teamodeApp",[]);
teamodeApp.factory("signupService", ["$http", function($http){
	return {
		post: function(postData, fn){
			$http({
				method: 'POST',
				url: "/signup",
				data: postData,
				headers: teamode.postJsonHeader 
			}).success(function(data){
				fn(data);

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
			signupService.post(angular.toJson($scope.user), function(data){
				if (data.error){
					teamode.showMsg(data.error);
				}
				else {
					window.location = "/";

				}

				
			});
	}
}
}
SignupCtrl['$inject'] = ["$scope", "$http", "signupService"];