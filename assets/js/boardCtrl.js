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
	var listContainer = $('.list-container');
	$scope.listWidth = listContainer.width() + parseInt(listContainer.css("marginTop")) * 2;
	$scope.sortableOptions = {
		start: function (event, ui) {
			ui.item.addClass('tilt');
			ui.placeholder.height(ui.item.height());
			$(event.target).data("ui-sortable").floating = true;
		},
		stop: function (event, ui) {
			ui.item.removeClass('tilt');
			var data = $scope.lists.map(function(i){
		        return i.id;
		      }).join(', ');
			console.log(data);
		},
		update: function(event, ui){
		},
		placeholder: "portlet-placeholder ui-corner-all"

	};
	$( "#sortable" ).disableSelection();
	var resizeContainer = function() {
			var newWidth = $scope.listWidth * ($scope.lists.length + 2)
			console.log($scope.listWidth);
			$(".container-h-scroll").width(newWidth);

	}
	httpService.getList($('#title').data('boardid'), function(lists){
		if (!lists.error){
			$scope.lists = lists;
			resizeContainer();
		}
	})
	$scope.addNewListClicked = function(){
		$scope.newListName = "";
		$('#addListBtn').hide();
		$('#addListForm').fadeIn(200);
	};

	var closeAddList = function() {
		$('#addListForm').fadeOut({
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
				$('#addListForm').hide();
				$('#addListBtn').show();
				if (data && !data.error){
					$scope.lists.push(data);
					resizeContainer();
				}

			}, function(data, status){
				closeAddList();
			});

		}
	}

}]);
