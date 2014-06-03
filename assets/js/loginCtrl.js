var teamodeApp = angular.module("teamodeLogin",[]);
teamodeApp.factory("httpService", ["$http", teamode.httpServices]);

LoginCtrl = function($scope, httpService){
	$scope.user = {
		username: "",
		password: ""
	}
	$scope.login = function(){
		console.log("login clicked");
		httpService.login($scope.user, function(data){
			console.log(data);
			if (data.error){
				teamode.showMsg(data.error);
			}
			else {
				window.location = "/";
			}
		})
	}

}
LoginCtrl['$inject'] = ["$scope", "httpService"];