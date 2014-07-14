var teamodeApp = angular.module("teamodeLogin",['ui.bootstrap']);
teamodeApp.factory("httpService", ["$http", teamode.httpServices]);

LoginCtrl = function($scope, httpService){
	$scope.user = {
		username: "",
		password: "",
		remember: "false"
	}
	$scope.passwordValid = true;
	$scope.usernameValid = true;
	$scope.login = function(){
		if (!$scope.user.username){
			$scope.alerts = [];
			$scope.alerts.push({type:'danger', msg: 'please enter username'});
			$scope.usernameValid = false;
			return;
		}
		if (!$scope.user.password){
			
			$scope.alerts = [];
			$scope.alerts.push({type:'danger', msg: 'please enter password'});
			$scope.passwordValid = false;
			return;
		}
		httpService.login($scope.user, function(data){
			if (data.error){
				$scope.alerts = [];
				$scope.alerts.push({type:'danger', msg:data.message});
			}
			else {
				window.location = "/";
			}
		})
	}

	$scope.closeAlert = function(index){
		$scope.alerts.splice(index, 1);
	}

}
LoginCtrl['$inject'] = ["$scope", "httpService"];