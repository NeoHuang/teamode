var teamodeApp = angular.module("teamodeLogin",[]);
teamodeApp.factory("loginService", ["$http", function($http){
	return {
		post: function(postData, fn){
			$http({
				method: 'POST',
				url: "/login",
				data: postData,
				headers: teamode.postJsonHeader 
			}).success(function(data){
				fn(data);
			})
		}
	}
}]);

LoginCtrl = function($scope, loginService){
	$scope.user = {
		username: "",
		password: ""
	}
	$scope.login = function(){
		console.log("login clicked");
		loginService.post(angular.toJson($scope.user), function(data){
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
LoginCtrl['$inject'] = ["$scope", "loginService"];