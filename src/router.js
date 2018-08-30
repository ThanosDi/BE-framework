const {curry, compose, T} = require('ramda');
const {createError} = require('micro');

const notFound = () => {
	throw createError(404, 'Not found');
};

const router = (...hooks) => compose(...hooks)(notFound);

const route = (predicate, handler) => next => async (req, res) =>
	(await predicate(req, res)) ? handler(req, res) : next(req, res);

const always = handler => route(T, handler);

module.exports = {
	always,
	route: curry(route),
	router,
};
