var teamodeApp = angular.module("teamodeApp",['ui.bootstrap']);
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
	$scope.alerts=[];
	$scope.register = function(){

		$scope.alerts = [];
		if (!$scope.user.username){
			$scope.alerts.push({type:'danger', msg: 'invalid username'});
		}
		if (!$scope.user.email){
			$scope.alerts.push({type:'danger', msg: 'invalid email'});
		}
		if (!$scope.user.password){
			$scope.alerts.push({type:'danger', msg: 'invalid password, the password length should be between 6 and 20'});
			$('#password').addClass('error');
		}
		if ($scope.passwordConfirm !== $scope.user.password){
			$scope.alerts.push({type:'danger', msg: 're-typed password doesn\'t match password'});
		}
		if ($scope.alerts.length === 0){
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

	$scope.closeAlert = function(index){
		$scope.alerts.splice(index, 1);
	}
}
SignupCtrl['$inject'] = ["$scope", "$http", "signupService"];