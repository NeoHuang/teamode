var teamode = teamode || {
	$this: this,

	showMsg : function(msg){
		$('#alert').removeClass("alert-info").addClass("alert-danger").text(msg).fadeIn(400).delay(3000).fadeOut(400);
	},

	postJsonHeader : {'Content-Type': 'application/json', 'ACCEPT': 'application/json'},

	post: function($http, url, data, callback){
		$http({
			method: 'POST',
			url: url,
			data: data,
			headers: this.postJsonHeader 
		}).success(function(data){
			callback(data);
		});
	},

	httpServices: function($http){
		return {
			login: function(user, fn){
				teamode.post($http, '/login', angular.toJson(user), fn);
			},

			signup: function(user, fn){
				teamode.post($http, '/signup', angular.toJson(user), fn);

			},

			logout: function(fn){
				teamode.post($http, '/logout', '', fn);
			}

		}
	}

	


};
