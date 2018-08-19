const {pipe, allPass, equals, ifElse} = require('ramda');
const {createError} = require('micro');
const basicAuth = require('basic-auth')

const isAuthenticated = ({username, password}) => pipe(
	basicAuth,
	props => props || {},
	allPass([
		({name}) => equals(username, name),
		({pass}) => equals(password, pass),
	])
)

module.exports = credentials => next => ifElse(
	isAuthenticated(credentials),
	next,
	() => {
		throw createError(401, 'Authentication failed')
	}
)
