var dashboardApp = angular.module('dashboardApp',['ui.bootstrap', 'ui.sortable']);
dashboardApp.factory('httpService', teamode.httpServices);
dashboardApp.directive('clickaway',['$document', function($document){

return {
  restrict: 'A',
  require: '?ngModel',
  link: function(scope, element, attr){
      scope.toggleSelect = function(){
        scope.isPopupVisible = !scope.isPopupVisible;
      }
      var index = 1;
      scope.$watch(attr.clickaway, function(value) {
        index = value || 1;
      });
      $document.bind('click', function(event){
        var isClickedElementChildOfPopup = element
          .find(event.target)
          .length > 0;
          
        if (isClickedElementChildOfPopup)
          return;
        element.children().hide();

        var showElement = $(element).children().eq(index);
        if (showElement){
        	showElement.show();
        }

      });
  }
};
}]);

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
			templateUrl: '/templates/addBoard.html',
			controller: AddBoardCtrl
			// resolve: {
			// 	items: function () {
			// 		return $scope.items;
			// 	}
			// }
		});

		modalInstance.result.then(function (board) {
			if (board.name ){
				if (!board.description){
					board.description = "";
				}
				httpService.addBoard(board, function(data){
					if (!data.err){
						window.location = '/b/' + data.id;
					}
				})
			}
		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
		});
	}

}]);

var AddBoardCtrl = function ($scope, $modalInstance) {
	$scope.board = {};


  $scope.ok = function () {
    $modalInstance.close($scope.board);
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
