const {curry, compose, equals, path, T} = require('ramda');
const {createError, json} = require('micro');

const notFound = () => {
	throw createError(404, 'Not found');
};

const router = (...hooks) => compose(...hooks)(notFound);

const route = (predicate, handler) => next => async (req, res) =>
	(await predicate(req, res)) ? handler(req, res) : next(req, res);

const getAction = async req => {
	const body = await json(req);
	return path(['result', 'interaction', 'action'], body);
};

const action = (actionName, handler) =>
	route(async req => equals(actionName, await getAction(req)), handler);

const getName = async req => {
	const body = await json(req);
	return path(['result', 'interaction', 'name'], body);
};

const name = (interactionName, handler) =>
	route(async req => equals(interactionName, await getName(req)), handler);

const always = handler => route(T, handler);

module.exports = {
	action: curry(action),
	always,
	name: curry(name),
	route,
	router,
};
