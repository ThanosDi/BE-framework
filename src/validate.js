const {allPass, pipe, prop, path, equals, ifElse} = require('ramda');
const urlParse = require('url-parse');
const queryString = require('query-string');
const {createError} = require('micro');
const {route} = require('./router');

const routePredicate = allPass([
	pipe(
		path(['req', 'url']),
		urlParse,
		prop('pathname'),
		equals('/'),
	),
	pipe(
		path(['req', 'method']),
		equals('GET'),
	),
]);

const handler = secureToken =>
	pipe(
		path(['req', 'url']),
		urlParse,
		prop('query'),
		queryString.parse,
		ifElse(
			({token}) => secureToken && secureToken !== token,
			() => {
				throw createError(401, 'Invalid token');
			},
			prop('challenge'),
		),
	);

module.exports = secureToken => route(routePredicate, handler(secureToken));
