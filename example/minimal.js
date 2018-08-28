const delay = require('delay');
const {response, validate} = require('../src');

const {respond, text} = response;

const validateWithToken = validate('token');

const bot = async () => {
	await delay(500);
	return respond(text('Ticket created!'));
};
module.exports = validateWithToken(bot);
