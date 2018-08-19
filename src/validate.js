const {equals, pipe, prop, ifElse} = require('ramda');
const urlParse = require('url-parse');
const {createError} = require('micro');

const handleValidation = verificationToken => pipe(
	req => urlParse(req.url, true),
	prop('query'),
	ifElse(
		({token}) => verificationToken && verificationToken !== token,
		() => {
			throw createError(401, 'Invalid token');
		},
		prop('challenge'),
	),
);

module.exports = verificationToken => next => ifElse(
	({method}) => equals('GET', method),
	handleValidation(verificationToken),
	next,
)
