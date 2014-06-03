var dashboardApp = angular.module('dashboardApp',[]);
dashboardApp.factory('httpService', teamode.httpServices);


dashboardApp.controller('NavCtrl', ['$scope', '$http', 'httpService', function($scope, $http, httpService){
	$scope.logout = function() {
		console.log('logout');
		httpService.logout(function(data){
			window.location = '/login';
		})
	}

}])
// NavCtrl = function($scope, $http, httpService){
// 	$scope.name="test";
// 	$scope.logout = function() {
// 		console.log('logout');
// 		httpService.logout(function(data){
// 			window.location = '/login';
// 		})
// 	}

// };

// NavCtrl['$inject'] = ['$scope', '$http', 'httpService'];
