var crypto = require('crypto');
var when = require('when');

var setTokenCookie = function(res, userCookie, token){
	res.cookie('tmdu', userCookie, {maxAge: 365 * 24 * 60 * 60 * 1000});
	res.cookie('tmdt', token, {maxAge: 365 * 24 * 60 * 60 * 1000});
}

module.exports = {

	updateToken: function(username, res, next){
		var userCookie = crypto.createHash('sha1').update(username).digest("hex");
		require('crypto').randomBytes(48, function(ex, buf) {
		var t = buf.toString('hex');

			Token.findOneByUserhash(userCookie, function(err, token){
				if (err){
					next();
				}
				else if (!token){
					Token.create({
						username: username,
						userhash: userCookie,
						token: t
					}).done(function(err, tokenSaved){
						if (!err){
							setTokenCookie(res, userCookie, t);
						}
						console.log("-------------" + tokenSaved.userhash);
						next();
					});

				}
				else {
					token.token = t;
					token.save(function(err){
						if (!err){
							setTokenCookie(res, userCookie, t);
						}
						next();
					});
				}
			});

		});

	},

	getCurrentUser: function(req, callback) {
		if (req.session.user){
			if (callback)
				callback(req.session.user);
		}
		else {
			if (req.cookies.tmdu &&
				req.cookies.tmdt){
				Token.validateToken(req.cookies.tmdu, req.cookies.tmdt).done(function(user){
					callback(user);
				}, function(err){
					callback(null);
				});

		}
		else {
			callback(null);

		}
	}

}
}