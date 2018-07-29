const {allPass, cond, curry, pathEq, pathOr, T, pipeP} = require('ramda');
const UrlPattern = require('url-pattern');
const parseBody = require('./lib/parse-body');

const isPOST = (props = {}) => pathEq(['req', 'method'], 'POST', props);

const router = (...routes) =>
	pipeP(
		async (req, res) => ({
			req,
			res,
			payload: await parseBody(req),
		}),
		cond(routes),
	);

const route = curry((predicate, handler) => [predicate, handler]);

const story = id =>
	route(
		allPass([
			isPOST,
			(props = {}) => pathEq(['payload', 'result', 'storyId'], id, props),
		]),
	);

const interaction = id =>
	route(
		allPass([
			isPOST,
			(props = {}) =>
				pathEq(['payload', 'result', 'interaction', 'id'], id, props),
		]),
	);

const trigger = trigger =>
	route(
		allPass([
			isPOST,
			(props = {}) => pathEq(['payload', 'result', 'trigger'], trigger, props),
		]),
	);

const source = source =>
	route(
		allPass([
			isPOST,
			(props = {}) => pathEq(['payload', 'result', 'source'], source, props),
		]),
	);

const headers = ([key, value]) =>
	route((props = {}) => pathEq(['req', 'headers', key], value, props));

const always = route(T);

const method = httpMethod =>
	route((props = {}) => pathEq(['req', 'method'], httpMethod, props));

const path = pattern => handler => [
	props => {
		const url = pathOr('invalid', ['req', 'url'], props);
		const p = new UrlPattern(pattern);

		return p.match(url) || false;
	},
	props => {
		const url = pathOr('', ['req', 'url'], props);
		const p = new UrlPattern(pattern);

		return handler({...props, params: p.match(url)});
	},
];

module.exports = {
	router,
	route,
	story,
	interaction,
	trigger,
	source,
	headers,
	always,
	method,
	path,
};
