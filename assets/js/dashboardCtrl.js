var dashboardApp = angular.module('dashboardApp',['ui.bootstrap']);
dashboardApp.factory('httpService', teamode.httpServices);


dashboardApp.controller('NavCtrl', ['$scope', '$http','$modal', 'httpService', function($scope, $http, $modal, httpService){
	$scope.logout = function() {
		console.log('logout');
		httpService.logout(function(data){
			window.location = '/login';
		})
	}

	$scope.addBoard = function(){
		console.log('addBoard');
		var modalInstance = $modal.open({
			templateUrl: 'templates/addBoard.html',
			controller: ModalInstanceCtrl,
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
		});
	}

}]);

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {


  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
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
