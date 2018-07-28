const {allPass, pipe, prop, path, equals, ifElse} = require('ramda')
const urlParse = require('url-parse')
const queryString = require('query-string')
const {createError} = require('micro')

module.exports = secureToken => [
	allPass([
		pipe(path(['req', 'url']), urlParse, prop('pathname'), equals('/')),
		pipe(path(['req', 'method']), equals('GET')),
	]),
	pipe(
		path(['req', 'url']),
		urlParse,
		prop('query'),
		queryString.parse,
		ifElse(
			({token}) => token && secureToken !== token,
			() => {throw createError(401, 'Invalid token')},
			prop('challenge')
		)
	)
]
