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
	var clearError = function(){
		$scope.passwordValid = true;
		$scope.passwordConfirmValid = true;
		$scope.usernameValid = true;
		$scope.emailValid = true;
	}
	clearError();
	$scope.register = function(){
		clearError();
		$scope.alerts = [];
		if (!/^[A-Za-z0-9_-]{3,20}$/.test($scope.user.usernamenew)){
			$scope.alerts.push({type:'danger', msg: 'invalid username'});
			$scope.usernameValid = false;
		}
		if (!validator.isEmail($scope.user.email)){
			$scope.alerts.push({type:'danger', msg: 'invalid email'});
			$scope.emailValid = false;
		}
		if (!/^.{6,20}$/.test($scope.user.password)){
			$scope.alerts.push({type:'danger', msg: 'invalid password, the password length should be between 6 and 20'});
			$scope.passwordValid = false;
		}
		if ($scope.passwordConfirm !== $scope.user.password){
			$scope.alerts.push({type:'danger', msg: 're-typed password doesn\'t match password'});
			$scope.passwordValid = false;
		}
		if ($scope.alerts.length === 0){
			signupService.post(angular.toJson($scope.user), function(data){
				if (data.error){
					$scope.alerts.push({type:'danger', msg: data.message});
				}
				else {
					window.location = "/";

				}

				
			}, function(data){
					$scope.alerts.push({type:'danger', msg: data.message});
			});
		}
	}

	$scope.closeAlert = function(index){
		$scope.alerts.splice(index, 1);
	}
}
SignupCtrl['$inject'] = ["$scope", "$http", "signupService"];