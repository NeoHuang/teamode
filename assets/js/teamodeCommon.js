var teamode = teamode || {
	$this: this,

	showMsg : function(msg){
		$('#alert').removeClass("alert-info").addClass("alert-danger").text(msg).fadeIn(400).delay(3000).fadeOut(400);
	},

	postJsonHeader : {'Content-Type': 'application/json', 'ACCEPT': 'application/json'},

	post: function($http, url, data, callback, errorCallback){
		$http({
			method: 'POST',
			url: url,
			data: data,
			headers: this.postJsonHeader 
		}).success(function(data){
			callback(data);
		}).error(function(data, status){
			if (errorCallback){
				errorCallback(data, status);
			}
		});
	},
	get: function($http, url, callback){
		$http({
			method: 'GET',
			url: url,
			headers: this.postJsonHeader 
		}).success(function(data){
			callback(data);
		});
	},

	httpServices: function($http){
		return {
			login: function(user, fn, errFn){
				teamode.post($http, '/login', angular.toJson(user), fn, errFn);
			},

			signup: function(user, fn, errFn){
				teamode.post($http, '/signup', angular.toJson(user), fn, errFn);

			},

			logout: function(fn, errFn){
				teamode.post($http, '/logout', '', fn, errFn);
			},

			listBoards: function(fn, errFn){
				teamode.get($http, '/board/list', fn, errFn);
			},

			addBoard: function(board, fn, errFn){
				teamode.post($http, '/board/add', angular.toJson(board), fn, errFn);
			},

			getList: function(boardId, fn, errFn){
				teamode.get($http, '/board/getList/' + boardId, fn, errFn);
			},

			addList: function(list, fn, errFn){
				teamode.post($http, '/list/add', angular.toJson(list), fn, errFn);
			},

			sortList: function(order, fn, errFn){
				teamode.post($http, '/list/changeOrder', angular.toJson(order), fn, errFn);
			},

			addIssue: function(issue, fn, errFn){
				teamode.post($http, '/issue/add', angular.toJson(issue), fn, errFn);
			},

			sortIssue: function(orderData, fn, errFn){
				teamode.post($http, '/issue/changeOrder', angular.toJson(orderData), fn, errFn);
			},

			moveIssue: function(moveData, fn, errFn){
				teamode.post($http, '/issue/move', angular.toJson(moveData), fn, errFn);
			}




		}
	}

	


};
