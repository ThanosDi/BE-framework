const {cond, curry, pathEq, pathOr, T, prop, pipeP, pipe} = require('ramda');
const UrlPattern = require('url-pattern');
const parseBody = require('./lib/parse-body');

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
		pipe(
			prop('payload'),
			pathEq(['result', 'storyId'], id),
		),
	);

const interaction = id =>
	route(
		pipe(
			prop('payload'),
			pathEq(['result', 'interaction', 'id'], id),
		),
	);

const trigger = trigger =>
	route(
		pipe(
			prop('payload'),
			pathEq(['result', 'trigger'], trigger),
		),
	);

const source = source =>
	route(
		pipe(
			prop('payload'),
			pathEq(['result', 'source'], source),
		),
	);

const headers = ([key, value]) =>
	route(
		pipe(
			prop('req'),
			pathEq(['headers', key], value),
		),
	);

const always = route(T);

const method = httpMethod =>
	route(
		pipe(
			prop('req'),
			pathEq(['method'], httpMethod),
		),
	);

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
