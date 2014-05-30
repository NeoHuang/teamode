var teamode = teamode || {
	showMsg : function(msg){
		$('#alert').removeClass("alert-info").addClass("alert-danger").text(msg).fadeIn(400).delay(3000).fadeOut(400);
	},
	postJsonHeader : {'Content-Type': 'application/json', 'ACCEPT': 'application/json'}
};
