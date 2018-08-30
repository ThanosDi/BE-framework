const {curry, equals, path,} = require('ramda');
const {json} = require('micro');
const {route} = require('../router')

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

module.exports = {
	action: curry(action),
	name: curry(name),
};
