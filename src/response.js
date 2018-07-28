const {map, ifElse, is, identity, pipe} = require('ramda')

const respond = (...responses) => async props => ({
	responses: await Promise.all(map(
		ifElse(is(Function), fn => fn(props), identity),
		responses
	))
})

const text = ifElse(
	is(String),
	text => ({
		type: 'text',
		elements: [text],
		filters: []
	}),
	({elements=[], filters=[]}) => ({
		type: 'text',
		elements,
		filters,
	})
)

const image = ifElse(
	is(String),
	imageUrl => ({
		type: 'image',
		imageUrl,
		filters: []
	}),
	({imageUrl, filters=[]}) => ({
		type: 'image',
		imageUrl,
		filters,
	})
)

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
	title,
	buttons,
	filters,
})

const end = pipe(
	props => props || {},
	({filters=[]}) => ({
		type: 'end',
		filters,
	})
)


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
