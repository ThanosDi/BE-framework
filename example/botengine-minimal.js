const delay = require('delay');
const {botengine} = require('../src');

const {verify, responses} = botengine
const {respond, text} = responses

const tokenVerify = verify('token');

const bot = async () => {
	await delay(500);
	return respond(text('Ticket created!'));
};

module.exports = tokenVerify(bot);
