dashboardApp.controller('BoardListCtrl', ['$scope', '$http', 'httpService', function($scope, $http, httpService){
	httpService.listBoards(function(data){
		if (!data.error){
			$scope.boards = data;
			for (var i = 0; i < $scope.boards.length; i++){
				$scope.boards[i].href = '/b/' + $scope.boards[i].id;
			}
		}

	})
}]);

dashboardApp.controller('BoardShowCtrl', ['$scope', '$http', 'httpService', function($scope, $http, httpService){
	$('#addListForm').hide();
	httpService.getList($('#title').data('boardid'), function(lists){
		if (!lists.error){
			$scope.lists = lists;
		}
	})
	$scope.addNewListClicked = function(){
		$scope.newListName = "";
		$('#addListBtn').hide();
		$('#addListForm').slideDown(200);
	};

	var closeAddList = function() {
		$('#addListForm').slideUp({
			duration: 200,
			done: function(){
				$('#addListBtn').show();

			}
		});

	}

	$(document).mouseup( function(e){
		var listForm = $('#addListForm');
		var addListBtn = $('#addListBtn');
		if (!listForm.is(e.target) && 
			listForm.has(e.target).length == 0 &&
			!addListBtn.is(e.target)){
			closeAddList();

		}

	});


	$scope.saveList = function(){
		if ($scope.newListName && $scope.newListName != ""){
			var newList = {
				name: $scope.newListName,
				boardId: $('#title').data('boardid')
			} 
			console.log(newList);
			httpService.addList(newList, function(data){
				if (data && !data.error){
					$scope.lists.push(data);
					$scope.$apply();
				}
				closeAddList();

			}, function(data, status){
				closeAddList();
			});

		}
	}

}]);
