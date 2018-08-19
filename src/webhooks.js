const {
	compose,
	ifElse,
	allPass,
	equals,
	pipe,
	prop,
	join,
	tap,
} = require('ramda')
const urlParse = require('url-parse')
const {createError} = require('micro');

const notFound = () => {
	throw createError(404, 'Not found')
}

const webhooks = (...hooks) => compose(...hooks)(notFound)

const getPath = pipe(
	prop('path'),
	urlParse,
	prop('pathname'),
	([_, ...action]) => join('', action),
)

getMethod = ({method}) => method

const action = (hook, handler) => next => ifElse(
	allPass([req => equals(hook, getPath(req)), req => equals('POST', getMethod(req))]),
	handler,
	next,
)

module.exports = {
	webhooks,
	action,
}
