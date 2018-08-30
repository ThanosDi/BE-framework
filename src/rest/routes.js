const {curry, equals, prop} = require('ramda');
const UrlPattern = require('url-pattern')
const {route} = require('../router')

const getMethod = prop('method')

const method = (method, handler) =>
	route(req => equals(method, getMethod(req)), handler);

const path = (pattern, handler) =>
	route(
		({path}) => (new UrlPattern(pattern)).match(path),
		async (req, res) => await handler({
			...req,
			params: (new UrlPattern(pattern)).match(req.path)
		}, res)
	);

module.exports = {
	method: curry(method),
	path: curry(path),
};
