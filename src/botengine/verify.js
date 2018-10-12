const {equals, pipe, prop, propEq, not} = require('ramda');
const urlParse = require('url-parse');
const {createError} = require('micro');

const hasValidToken = token =>
	pipe(
		req => urlParse(req.url, true),
		prop('query'),
		propEq('token', token),
	);

const handleChallenge = pipe(
	req => urlParse(req.url, true),
	prop('query'),
	prop('challenge'),
);

module.exports = token => next => (req, res, ...rest) => {
	const {method} = req;

	if (not(hasValidToken(token)(req))) {
		throw createError(401, 'Invalid token');
	}

	return equals('GET', method) ? handleChallenge(req) : next(req, res, ...rest);
};
