const {map, ifElse, is, identity} = require('ramda')

const respond = (...responses) => async props => ({
	responses: await Promise.all(map(
		ifElse(is(Function), fn => fn(props), identity),
		responses
	))
})

const text = ({elements=[], filters=[]}) => ({
	type: 'text',
	elements,
	filters,
})

const image = ({imageUrl, filters=[]}) => ({
	type: 'image',
	imageUrl,
	filters,
})

const quickReplies = ({title, buttons, filters=[]}) => ({
	type: 'quickReplies',
	title,
	buttons,
	filters,
})

const buttonElement = ({type='postback', title, value}) => ({
	type,
	title,
	value,
})

const card = ({title, subtitle, imageUrl, buttons, filters=[]}) => ({
	type: 'card',
	title,
	subtitle,
	imageUrl,
	buttons,
	filters,
})

const button = ({title, buttons, filters=[]}) => ({
	type: 'button',
	buttons,
	filters,
})

const end = ({filters=[]}) => ({
	type: 'end',
	filters,
})

const webhook = ({webhookId, filters=[]}) => ({
	type: 'webhook',
	webhookId,
	filters,
})

const goto = ({interactionId, filters=[]}) => ({
	type: 'goto',
	interactionId,
	filters,
})

module.exports = {
	respond,
	text,
	image,
	quickReplies,
	card,
	buttonElement,
	button,
	end,
	webhook,
	goto,
}
