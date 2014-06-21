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
	//$('#addListForm').hide();
	$scope.newIssueSummary = "";
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
		},
		update: function(event, ui){
		},
		placeholder: "list-placeholder ui-corner-all",
		handle: '.list-title'

	};

	$scope.cardSortableOpt = {
		connectWith: ".card-list",
		dropOnEmpty: true,
		start: function (event, ui) {
			ui.item.addClass('tilt');
			ui.placeholder.height(ui.item.height());
			$(event.target).data("ui-sortable").floating = true;
		},
		stop: function (event, ui){
			ui.item.removeClass('tilt');
		},
		placeholder: "card-placeholder ui-corner-all",

	}
	var resizeContainer = function() {
			var newWidth = $scope.listWidth * ($scope.lists.length + 2)
			console.log($scope.listWidth);
			$(".container-h-scroll").width(newWidth);

	}
	var generateIssueClass = function(severity){
					if (severity < 2){
						return "card-danger";

					}else if (severity < 5){
						return "card-normal";
					}
					else if (severity < 7){
						return "card-warn";
					}
					else {
						return "card-danger";
					}

	}
	httpService.getList($('#title').data('boardid'), function(lists){
		if (!lists.error){
			lists.forEach(function(e, index){
				e.issues.forEach(function(issue, issueIndex){
					lists[index].issues[issueIndex].class = generateIssueClass(issue.severity);

				})
			})
			$scope.lists = lists;
			resizeContainer();
		}
	})
	$scope.addNewListClicked = function(){
		$scope.newListName = "";
		$('#addListBtn').hide();
		$('#addListForm').fadeIn(200);
	};

	$scope.addNewIssueClicked = function(id){
		$scope.newIssueSummary = "";
		var pSelector = "#id_" + id ;
		$(pSelector + ' .card-composer').slideDown(300);
		$(pSelector + ' .list-footer').hide();
	};

	$scope.closeNewIssue = function(id){
		var pSelector = "#id_" + id ;
		$(pSelector + ' .card-composer').hide();
		$(pSelector + ' .list-footer').show();
	};


	var closeAddList = function() {
		$('#addListForm').fadeOut({
			duration: 200,
			done: function(){
				$('#addListBtn').show();

			}
		});

	}

	// $(document).mouseup( function(e){
	// 	var listForm = $('#addListForm');
	// 	var addListBtn = $('#addListBtn');
	// 	if (!listForm.is(e.target) && 
	// 		listForm.has(e.target).length == 0 &&
	// 		!addListBtn.is(e.target)){
	// 		closeAddList();

	// 	}

	// });


	$scope.saveList = function(){
		if ($scope.newListName && $scope.newListName != ""){
			var newList = {
				name: $scope.newListName,
				boardId: $('#title').data('boardid')
			} 
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

	$scope.addIssue = function(index){
		console.log($scope.newIssueSummary);
			var newIssue = {
				summary:$scope.newIssueSummary,
				listId: $scope.lists[index].id,
				description: "",
				severity: 9,
				point: 0,
			}
		if (newIssue.summary && newIssue.summary !=""){
			$scope.newIssueSummary = "";
			httpService.addIssue(newIssue, function(data){
				if (data && !data.error){
					newIssue.class = generateIssueClass(newIssue.severity);
					$scope.lists[index].issues.push(newIssue);
					// $scope.closeNewIssue($scope.lists[index].id);
				}
				else {
					console.log(data);
				}
			})

		}
	}

}]);
