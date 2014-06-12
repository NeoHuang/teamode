module.exports = {
	errLoginRequired: {
		error: 403, 
		message: "please login first"
	},

	errDb: {
		error: 500, 
		message: 'DB Error'
	},

	errNotAllowed: {
		error: 401,
		message: 'you are not allowed to perform this action'
	},

	errInvalidFormat: {
		error: 500,
		message: 'invalid request format'
	}


}